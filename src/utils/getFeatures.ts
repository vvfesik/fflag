import { get, sortBy } from 'lodash-es';
import ff from '../features.json';

const { features } = ff;

export type FeatureKey = keyof typeof features;
export type FeatureValue = boolean | number;
export type FeatureType = {
  key: FeatureKey;
  value: FeatureValue;
  group?: string;
  childOf?: string;
  children?: FeatureType[];
};

const featureList = Object.keys(features) as FeatureKey[];

const getGroupByKey = (key: FeatureKey) => {
  const splitted = key.split('.');
  return splitted.length >= 2 ? splitted[0] : undefined;
};

const getParentByKey = (key: FeatureKey) => {
  const splitted = key.split('.');
  return splitted.length >= 3 ? `${splitted[0]}.${splitted[1]}` : undefined;
};

export const getFeatureGroups = () => {
  const groups = featureList.map((key) => getGroupByKey(key));
  return Array.from(new Set(groups)).filter(Boolean);
};

const makeFeatureByKey = (key: FeatureKey) => ({
  key,
  value: features[key],
  group: getGroupByKey(key),
  childOf: undefined,
  children: undefined,
});

const getFeaturesWithParents = () => {
  const parents = Array.from(
    new Set(featureList.map((key) => getParentByKey(key))),
  ).filter(Boolean);
  const featuresWithParents: FeatureType[] = [];
  parents.forEach((parent) => {
    const children: FeatureType[] = [];
    children.push(
      ...featureList
        .filter((key) => key.startsWith(`${parent}.`))
        .map((key) => ({
          ...makeFeatureByKey(key),
          childOf: parent,
        })),
    );
    featuresWithParents.push({
      children,
      key: parent as FeatureKey,
      value: children.some((f) => f.value),
      group: getGroupByKey(children[0].key),
    });
  });
  return featuresWithParents;
};

const isChildByKey = (key: FeatureKey) => Boolean(getParentByKey(key));

export const getFeatures = () =>
  sortBy(
    [
      ...getFeaturesWithParents(),
      ...featureList
        .filter((key) => !isChildByKey(key))
        .map((key) => makeFeatureByKey(key)),
    ],
    ['key'],
  );

export const getOptionsByFeature = (featureKey: FeatureKey) =>
  get(ff.options, [featureKey]);

export default getFeatures;

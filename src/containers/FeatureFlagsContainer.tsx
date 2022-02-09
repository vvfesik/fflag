import FeatureFlag from '../components/FeatureFlag/FeatureFlag';
import FeatureFlagGroup from '../components/FeatureFlag/FeatureFlagGroup';
import { useFeatureReducer } from '../reducers/featureReducer';
import { getFeatureGroups, FeatureType } from '../utils/getFeatures';

const groups = getFeatureGroups();

const FeatureFlagsContainer = () => {
  const [features, dispatch] = useFeatureReducer();

  const handleFeatureFlag = (
    key: FeatureType['key'],
    value: FeatureType['value'],
  ) => {
    dispatch({
      key,
      value,
      type: 'changed',
    });
  };

  const handleChildFeatureFlag = (
    key: FeatureType['key'],
    value: FeatureType['value'],
  ) => {
    dispatch({
      key,
      value,
      type: 'changed child',
    });
  };

  const getFeaturesByGroup = (groupName?: string) =>
    features.filter((feature) => feature.group === groupName);

  const isFeatureRow = (groupName?: string) =>
    getFeaturesByGroup(groupName).length >= 3;

  return (
    <div>
      {groups.map((featureGroup) => (
        <FeatureFlagGroup
          key={featureGroup}
          featureGroup={featureGroup}
          isRow={isFeatureRow(featureGroup)}
        >
          {getFeaturesByGroup(featureGroup).map((feature) => (
            <FeatureFlag
              key={feature.key}
              feature={feature}
              onChange={handleFeatureFlag}
            >
              {feature.children?.map((featureChild) => (
                <FeatureFlag
                  key={featureChild.key}
                  feature={featureChild}
                  onChange={handleChildFeatureFlag}
                />
              ))}
            </FeatureFlag>
          ))}
        </FeatureFlagGroup>
      ))}
    </div>
  );
};

export default FeatureFlagsContainer;

import { useReducer } from 'react';
import {
  getFeatures,
  getOptionsByFeature,
  FeatureType,
} from '../utils/getFeatures';

const initialFeatures = getFeatures();

export const useFeatureReducer = () => useReducer(featuresReducer, initialFeatures);

export const featuresReducer = (
  features: FeatureType[],
  action: {
    type: string;
    key: FeatureType['key'];
    value: FeatureType['value'];
  },
) => {
  switch (action.type) {
    case 'changed': {
      return features.map((feature) => {
        if (feature.key === action.key) {
          if (feature.children?.length) {
            return {
              ...feature,
              children: feature.children.map(child => ({
                  ...child,
                  value: action.value ? (getOptionsByFeature(child.key)?.[0] || action.value) : action.value
                }
              )),
              value: action.value,
            };
          } else {
            return { ...feature, value: action.value };
          }
        } else {
          return feature;
        }
      });
    }
    case 'changed child': {
      return features.map((feature) => {
        if (feature.children?.find(child => child.key === action.key)) {
          const _feature = {
            ...feature,
            children: feature.children.map(child => {
              if (child.key === action.key) {
                return {
                  ...child,
                  value: action.value,
                }
              } else {
                return child;
              }
            }),
          };
          return {
            ..._feature,
            value: _feature.children.every(child => !child.value) ? false : true,
          };
        } else {
          return feature;
        }
      });
    }
    default:
      throw Error(`Unknown action: ${action.type}`);
  }
};

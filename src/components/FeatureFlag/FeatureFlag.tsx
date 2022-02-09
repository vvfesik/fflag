import React, { useState, useEffect } from 'react';
import FeatureFlagActions from './FeatureFlagActions';
import getText from '../../utils/getText';
import { FeatureType } from '../../utils/getFeatures';

interface IFeatureFlagProps {
  feature: FeatureType;
  onChange: (
    feature: FeatureType['key'],
    value: FeatureType['value'],
  ) => void;
}

const FeatureFlag: React.FC<IFeatureFlagProps> = (props) => {
  const { feature, onChange } = props;
  const [isExpanded, setIsExpanded] = useState<boolean>(!!feature.value);

  const onExpand = () => setIsExpanded((isExpanded) => !isExpanded);

  useEffect(() => {
    setIsExpanded(!!feature.value)
  }, [feature.value]);

  return (
    <div className='flex flex-wrap w-80 rounded-md px-4 bg-zinc-900'>
      <div className='flex flex-wrap justify-between w-full py-4 tracking-widest small-caps items-center'>
        {getText('features', feature.key)}
        <FeatureFlagActions
          name={feature.key}
          value={feature.value}
          isExpandable={!!props.children}
          isExpanded={isExpanded}
          onExpand={onExpand}
          onChange={onChange}
        />
      </div>
      {isExpanded && props.children}
    </div>
  );
};

export default FeatureFlag;

import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import Toggle from '../Toggle/Toggle';
import FeatureFlagOptions from './FeatureFlagOptions';
import { IconChevron } from '../Icons/Icons';
import { getOptionsByFeature, FeatureType } from '../../utils/getFeatures';

interface IFeatureFlagActionsProps {
  name: FeatureType['key'];
  value: FeatureType['value'];
  isExpandable?: boolean;
  isExpanded?: boolean;
  onExpand?: () => void;
  onChange?: (feature: FeatureType['key'], value: FeatureType['value']) => void;
}

const FeatureFlagActions: React.FC<IFeatureFlagActionsProps> = (props) => {
  const {
    name,
    value,
    isExpandable,
    isExpanded,
    onExpand,
    onChange,
  } = props;
  const [isChecked, setIsChecked] = useState<boolean>(!!value);
  const [selectedOption, setSelectedOption] = useState<number | undefined>();

  useEffect(() => {
    setIsChecked(!!value);
  }, [value]);

  const options = getOptionsByFeature(name);

  const onToggle = () => {
    const toggleState = !isChecked;
    setIsChecked(toggleState);
    if (toggleState) {
      onChange?.(name, options?.[0] || toggleState);
    } else {
      setSelectedOption(undefined);
      onChange?.(name, toggleState);
    }
  };

  const selectOption = (optionValue: number) => {
    setSelectedOption(optionValue);
    onChange?.(name, optionValue);
  };

  return (
    <div className='inline-flex items-center'>
      {options && isChecked && (
        <FeatureFlagOptions
          value={selectedOption}
          options={options}
          onChange={selectOption}
        />
      )}
      <Toggle checked={!!isChecked} onToggle={onToggle} />
      {isExpandable && (
        <IconChevron
          width='0.6rem'
          onClick={onExpand}
          className={cn(
            'ml-4 hover:cursor-pointer transition ease-linear duration-300',
            `${isExpanded ? 'rotate-180' : 'rotate-0'}`,
          )}
        />
      )}
    </div>
  );
};

export default FeatureFlagActions;

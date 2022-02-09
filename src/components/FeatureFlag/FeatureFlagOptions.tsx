import React from 'react';
import { IconChevron } from '../Icons/Icons';

interface IFeatureFlagOptionsProps {
  value?: number;
  options: number[];
  onChange: (value: number) => void;
}

const FeatureFlagOptions: React.FC<IFeatureFlagOptionsProps> = (props) => {
  const { value, options, onChange } = props;

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    onChange(Number(e.target.value));

  return (
    <div className='relative mr-4'>
      <IconChevron className='absolute flex w-[0.6rem] h-full right-2 pointer-events-none' />
      <select
        value={value}
        onChange={handleOnChange}
        className='appearance-none pl-2 rounded min-w-[5rem] bg-black text-zinc-200'
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FeatureFlagOptions;

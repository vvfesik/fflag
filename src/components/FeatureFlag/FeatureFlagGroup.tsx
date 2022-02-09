import * as React from 'react';
import cn from 'classnames';
import { getText } from '../../utils/getText';

interface IFeatureFlagGroupProps {
  featureGroup?: string;
  isRow?: boolean;
}

const FeatureFlagGroup: React.FC<IFeatureFlagGroupProps> = (props) => {
  const { featureGroup, isRow } = props;

  return (
    <section className='inline-block m-4 mr-0'>
      <header className='my-4 uppercase tracking-widest'>
        {getText('features', featureGroup!)}
      </header>
      <div
        className={cn(
          'flex flex-wrap gap-4',
          `${isRow ? 'flex-row' : 'flex-col'}`,
        )}
      >
        {props.children}
      </div>
    </section>
  );
};

export default FeatureFlagGroup;

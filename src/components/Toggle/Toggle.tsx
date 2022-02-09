import React from 'react';
import cn from 'classnames';

interface IToggleProps {
  checked: boolean;
  onToggle: VoidFunction;
}

const Toggle: React.FC<IToggleProps> = (props) => {
  const { checked = false, onToggle } = props;

  return <div className={cn('toggle', { checked })} onClick={onToggle} />;
};

export default Toggle;

interface IIconProps {
  fill?: string;
  width?: string;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export const IconChevron = (props: IIconProps) => {
  const { fill = '#e3e3e3', width, ...otherProps } = props;
  return (
    <div {...otherProps}>
      <svg
        viewBox='0 0 20 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        width={width}
      >
        <path
          d='M.5 6.7C-.2 6-.2 5 .5 4.3c.6-.7 1.6-.7 2.3 0L10 12l7.2-7.8c.7-.7 1.7-.7 2.3 0 .7.6.7 1.7 0 2.4l-8.4 9c-.6.8-1.6.8-2.2 0l-8.4-9Z'
          fill={fill}
        />
      </svg>
    </div>
  );
};

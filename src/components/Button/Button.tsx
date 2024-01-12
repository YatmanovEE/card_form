import React from 'react';
import classes from './Button.module.scss';

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => {
  return (
    <button {...props} className={classes.root} type={props?.type ?? 'button'}>
      {children}
    </button>
  );
};

export default Button;

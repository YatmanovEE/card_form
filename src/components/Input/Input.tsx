import React, { useId } from 'react';
import classes from './Input.module.scss';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError: boolean;
  fieldName: string;
  label: string;
}

const Input: React.FC<Props> = ({ hasError, fieldName, label, ...props }) => {
  const id = useId();
  return (
    <div className={classes.root}>
      <input
        id={id}
        {...props}
        className={`${classes.input} ${hasError ? classes.invalid : classes.valid}`}
        placeholder={props.placeholder ?? ' '}
      />
      <span className={classes.inputBorder} />
      <label htmlFor={id} className={classes.label}>
        {label}
      </label>
    </div>
  );
};

export default Input;

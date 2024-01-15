import React from 'react';
import classes from './Stepper.module.scss';

type IStepperProps = {
  title: string;
  children?: React.ReactNode;
};
const Stepper: React.FC<IStepperProps> = ({ title, children }) => {
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>{title}</h1>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

export default Stepper;

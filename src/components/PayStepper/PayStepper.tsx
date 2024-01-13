import React from 'react';
import Form from '../Form';
import Close from '@/assets/Close.svg';
import Check from '@/assets/Check.svg';
import Stepper from './Stepper';

const PayStepper: React.FC = () => {
  const [position, setPosition] = React.useState<'form' | 'loader' | 'valid' | 'error'>('form');
  if (position === 'loader') {
    return <Stepper title='Оплата...' />;
  }

  if (position === 'valid') {
    return (
      <Stepper title='Оплата прошла успешно'>
        <Check width={47} height={47} color='#08D60E' />
      </Stepper>
    );
  }
  if (position === 'error') {
    return (
      <Stepper title='Произошла ошибка'>
        <Close width={47} height={47} color='#F44336' />
      </Stepper>
    );
  }

  return (
    <Stepper title='Оплата банковской картой'>
      <Form
        onSubmit={(map) => {
          const value: Record<string, string> = {};
          map.forEach(({ state }, fieldName) => {
            value[fieldName] = state;
          });
          setPosition('loader');
          setTimeout(() => {
            setPosition('error');
          }, 1000);
        }}
      />
    </Stepper>
  );
};

export default PayStepper;

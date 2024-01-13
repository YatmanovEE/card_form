import React from 'react';
import { useForm } from '../Hooks';
import Input from './Input/Input';
import { intervalLength, required } from './validators/validators';

const Form: React.FC = () => {
  const { register, onSubmit, error } = useForm();
  return (
    <form
      onSubmit={onSubmit((fieldState) => {
        console.log(fieldState);
      })}
    >
      <Input
        {...register('name', [required, intervalLength(13, 19)])}
        hasError={error?.name}
        label='Имя'
      />
      <Input
        {...register('card')}
        hasError={error?.card}
        label='Карточка'
        formatter={{
          format: '#### #### #### ####',
          patternChar: '#',
        }}
      />
      <button type='submit'>SS</button>
    </form>
  );
};

export default Form;

import React from 'react';
import { useForm } from '../Hooks';
import Input from './Input/Input';
const Form: React.FC = () => {
  const { register, onSubmit } = useForm();
  return (
    <form
      onSubmit={onSubmit((fieldState) => {
        console.log(fieldState);
      })}
    >
      <Input
        {...register('card')}
        label='Номер карты'
        formatter={{
          format: '#### #### #### ####',
          patternChar: '#',
        }}
      />
      <Input
        {...register('card')}
        label='Месяц/Год'
        formatter={{
          format: '##/##',
          patternChar: '#',
        }}
      />
      <button type='submit'>SS</button>
    </form>
  );
};

export default Form;

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
        inputMode='numeric'
        pattern='[0-9]'
        autoComplete='cc-number'
      />
      <Input
        {...register('month')}
        label='Месяц/Год'
        formatter={{
          format: '##/##',
          patternChar: '#',
        }}
        inputMode='numeric'
        pattern='[0-9]'
        autoComplete='cc-exp'
      />
      <Input
        {...register('month')}
        label='Код'
        type='password'
        inputMode='numeric'
        pattern='[0-9]'
        autoComplete='cc-csc'
        maxLength={3}
      />
      <Input {...register('month')} label='Владелец карты' autoComplete='cc-name' />
      <button type='submit'>Отправить</button>
    </form>
  );
};

export default Form;

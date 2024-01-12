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
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          maxWidth: 352,
        }}
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
          style={{ gridColumn: '1/4' }}
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
          style={{ gridColumn: '1/2' }}
        />
        <Input
          {...register('month')}
          label='Код'
          type='password'
          inputMode='numeric'
          pattern='[0-9]'
          autoComplete='cc-csc'
          maxLength={3}
          style={{ gridColumn: '3/4' }}
        />
        <Input
          {...register('month')}
          label='Владелец карты'
          autoComplete='cc-name'
          style={{ gridColumn: '1/4' }}
        />
        <button type='submit' style={{ gridColumn: '1/4' }}>
          Отправить
        </button>
      </div>
    </form>
  );
};

export default Form;

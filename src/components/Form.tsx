import React from 'react';
import { useForm } from '../Hooks';
import Input from './Input/Input';
import Button from './Button/Button';
import { required } from './validators/validators';

const Form: React.FC = () => {
  const { register, onSubmit, submitDisabled } = useForm();
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
          {...register('pan', [required])}
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
          {...register('expire', [required])}
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
          {...register('cvc', [required])}
          label='Код'
          type='password'
          inputMode='numeric'
          pattern='[0-9]'
          autoComplete='cc-csc'
          maxLength={3}
          style={{ gridColumn: '3/4' }}
        />
        <Input
          {...register('cardholder', [required])}
          label='Владелец карты'
          autoComplete='cc-name'
          style={{ gridColumn: '1/4' }}
        />
        <Button type='submit' style={{ gridColumn: '1/4' }} disabled={submitDisabled()}>
          Отправить
        </Button>
      </div>
    </form>
  );
};

export default Form;

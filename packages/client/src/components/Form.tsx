import React from 'react';
import { useForm } from '../Hooks';
import Input from './Input/Input';
import Button from './Button/Button';
import {
  intervalLength,
  maxLength,
  required,
  stringOnly,
  validDate,
  wordsCount,
} from '../validators/validators';
import { IFormFieldState } from './Common';

type IFormProps = {
  onSubmit: (value: Map<string, IFormFieldState>) => void;
};

const Form: React.FC<IFormProps> = ({ onSubmit: submitHandler }) => {
  const { register, onSubmit, submitDisabled } = useForm();
  return (
    <form
      onSubmit={onSubmit((fieldState) => {
        submitHandler(fieldState);
      })}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridRowGap: '50px',
        }}
      >
        <Input
          {...register('pan', [required, intervalLength(13, 19)])}
          label='Номер карты'
          formatter={{
            format: '#### #### #### #### ###',
            patternChar: '#',
            unformatted: true,
          }}
          inputMode='numeric'
          autoComplete='cc-number'
          style={{ gridColumn: '1/4' }}
        />
        <Input
          {...register('expire', [required, validDate])}
          label='Месяц/Год'
          formatter={{
            format: '##/##',
            patternChar: '#',
          }}
          inputMode='numeric'
          autoComplete='cc-exp'
          style={{ gridColumn: '1/2' }}
          textAlign='center'
        />
        <Input
          {...register('cvc', [required, maxLength(3)])}
          label='Код'
          type='password'
          inputMode='numeric'
          autoComplete='cc-csc'
          maxLength={3}
          textAlign='center'
          style={{ gridColumn: '3/4' }}
        />
        <Input
          {...register('cardholder', [required, wordsCount(2), stringOnly])}
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

import React from 'react';
import { useForm } from '../Hooks';
import Input from './Input/Input';
import Button from './Button/Button';
import { required } from './validators/validators';

/**
 * Представляет состояние поля формы.
 */
type IFormFieldState = {
  state: string;
  error: boolean;
  validateHandler: (value: string) => boolean;
};

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
          autoComplete='cc-exp'
          style={{ gridColumn: '1/2' }}
        />
        <Input
          {...register('cvc', [required])}
          label='Код'
          type='password'
          inputMode='numeric'
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

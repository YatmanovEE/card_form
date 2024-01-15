import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from './Input';
import '@testing-library/jest-dom';

describe('Компонент Input', () => {
  it('Рендерится без ошибок', () => {
    render(
      <Input
        error={{}}
        fieldName='testField'
        label='Тестовая метка'
        formatter={{ patternChar: 'X', format: 'XXX-XXX' }}
      />,
    );

    // Проверка, что компонент рендерится без ошибок
    const inputElement = screen.getByTestId('input');
    expect(inputElement).toBeInTheDocument();
  });

  it('Обрабатывает изменение значения и форматирование', () => {
    const handleChangeMock = jest.fn();
    const { getByTestId } = render(
      <Input
        error={{}}
        fieldName='testField'
        label='Test Label'
        formatter={{ patternChar: '#', format: '####-####' }}
        onChange={handleChangeMock}
      />,
    );

    const inputElement = getByTestId('input');
    fireEvent.change(inputElement, { target: { value: '12345678' } });

    expect(handleChangeMock).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value: '1234-5678', // formatted value
        }),
      }),
    );
  });

  it('обрабатывает режим числового ввода', () => {
    const onChangeMock = jest.fn();

    render(
      <Input
        error={{}}
        fieldName='testField'
        label='Тестовая метка'
        inputMode='numeric'
        onChange={onChangeMock}
      />,
    );

    const inputElement = screen.getByTestId('input');
    fireEvent.change(inputElement, { target: { value: 'abc123' } });
    expect(inputElement).toHaveValue('');
    expect(onChangeMock).not.toHaveBeenCalled();
  });
});

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Form from './Form';

describe('Form component', () => {
  it('renders form fields correctly', () => {
    const { getByLabelText, getByText } = render(<Form onSubmit={() => {}} />);

    expect(getByLabelText('Номер карты')).toBeInTheDocument();
    expect(getByLabelText('Месяц/Год')).toBeInTheDocument();
    expect(getByLabelText('Код')).toBeInTheDocument();
    expect(getByLabelText('Владелец карты')).toBeInTheDocument();
    expect(getByText('Отправить')).toBeInTheDocument();
  });

  it('submits form with correct field values', () => {
    const submitHandler = jest.fn();
    const { getByLabelText, getByText } = render(<Form onSubmit={submitHandler} />);

    fireEvent.change(getByLabelText('Номер карты'), { target: { value: '1234 5678 9012 3456' } });
    fireEvent.change(getByLabelText('Месяц/Год'), { target: { value: '12/24' } });
    fireEvent.change(getByLabelText('Код'), { target: { value: '123' } });
    fireEvent.change(getByLabelText('Владелец карты'), { target: { value: 'John Doe' } });

    fireEvent.click(getByText('Отправить'));

    expect(submitHandler).toHaveBeenCalledWith(expect.any(Map));
    const submittedFields = submitHandler.mock.calls[0][0];

    expect(submittedFields.get('pan').state).toBe('1234567890123456');
    expect(submittedFields.get('expire').state).toBe('12/24');
    expect(submittedFields.get('cvc').state).toBe('123');
    expect(submittedFields.get('cardholder').state).toBe('John Doe');
  });

  // Добавьте дополнительные тесты в зависимости от вашей логики и требований

});

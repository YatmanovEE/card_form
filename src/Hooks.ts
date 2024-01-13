import React, { FormEvent, ChangeEventHandler } from 'react';

/**
 * Представляет состояние поля формы.
 */
type IFormFieldState = { state: string; error: boolean };

/**
 * Представляет функцию валидации для поля формы.
 */
export type IValidator = (value: string) => boolean;

/**
 * Пользовательский хук React для управления состоянием формы и валидацией.
 * @returns {{
 *   register: (fieldName: string, validateArray?: Array<IValidator>) => {
 *     onChange: ChangeEventHandler<HTMLInputElement>,
 *     onBlur: ChangeEventHandler<HTMLInputElement>,
 *     fieldName: string
 *   },
 *   onSubmit: (handleSubmit: (state: Map<string, IFormFieldState>) => void) => React.FormEventHandler<HTMLFormElement>,
 *   error: Record<string, boolean>
 * }}
 */
export function useForm(): {
  register: (
    fieldName: string,
    validateArray?: Array<IValidator>,
  ) => {
    onChange: ChangeEventHandler<HTMLInputElement>;
    onBlur: ChangeEventHandler<HTMLInputElement>;
    fieldName: string;
  };
  onSubmit: (
    handleSubmit: (state: Map<string, IFormFieldState>) => void,
  ) => React.FormEventHandler<HTMLFormElement>;
  error: Record<string, boolean>;
} {
  // Ссылка для хранения состояния полей формы
  const fieldsState = React.useRef(new Map<string, IFormFieldState>());

  // Состояние для отслеживания ошибок валидации
  const [error, setError] = React.useState<Record<string, boolean>>({});

  /**
   * Регистрирует поле формы и возвращает обработчики событий onChange и onBlur.
   * @param {string} fieldName - Уникальный идентификатор поля формы.
   * @param {Array<IValidator>} [validateArray=[]] - Массив функций валидации.
   * @returns {{
   *   onChange: ChangeEventHandler<HTMLInputElement>,
   *   onBlur: ChangeEventHandler<HTMLInputElement>,
   *   fieldName: string
   * }}
   */
  const register = React.useCallback((fieldName: string, validateArray: Array<IValidator> = []) => {
    /**
     * Выполняет валидацию значения с использованием предоставленных функций валидации.
     * @param {string} value - Значение для валидации.
     * @returns {boolean} - Указывает, является ли значение допустимым.
     */
    const validateHandler = (value: string) => {
      let newError = false;
      validateArray.some((validate) => {
        const result = validate(value);
        if (result) {
          return true;
        }
        newError = true;
        return false;
      });
      fieldsState.current.set(fieldName, {
        state: value,
        error: newError,
      });
      return newError;
    };

    /**
     * Обрабатывает событие onChange элемента ввода.
     * @type {ChangeEventHandler<HTMLInputElement>}
     */
    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      setError((prev) => ({
        ...prev,
        [fieldName]: validateHandler(e.target.value),
      }));
    };

    /**
     * Обрабатывает событие onBlur элемента ввода.
     * @type {ChangeEventHandler<HTMLInputElement>}
     */
    const onBlur: ChangeEventHandler<HTMLInputElement> = (e) => {
      const fieldValue = fieldsState.current.get(fieldName);
      if (fieldValue) {
        setError((prev) => ({
          ...prev,
          [fieldName]: validateHandler(fieldValue.state),
        }));
      }
    };

    return { onChange, onBlur, fieldName };
  }, []);

  /**
   * Возвращает обработчик события отправки формы, который предотвращает стандартное
   * поведение отправки формы, выполняет валидацию всех зарегистрированных полей
   * и вызывает предоставленную функцию handleSubmit с текущим состоянием формы.
   * @param {function(state: Map<string, IFormFieldState>): void} handleSubmit - Функция обратного вызова для обработки отправки формы.
   * @returns {React.FormEventHandler<HTMLFormElement>} - Обработчик события отправки формы React.
   */
  const onSubmit = React.useCallback(
    (handleSubmit: (state: Map<string, IFormFieldState>) => void) =>
      (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSubmit(fieldsState.current);
      },
    [],
  );

  return { register, onSubmit, error };
}
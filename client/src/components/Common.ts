/**
 * Представляет состояние поля формы.
 */
export type IFormFieldState = {
  state: string;
  error: boolean;
  validateHandler: (value: string) => boolean;
};

/**
 * Представляет функцию валидации для поля формы.
 */
export type IValidator = (value: string) => boolean;

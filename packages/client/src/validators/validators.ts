import { IValidator } from '../components/Common';

/**
 * Валидатор для проверки, что значение не пусто.
 */
export const required: IValidator = (value) => {
  return !!value;
};

/**
 * Валидатор для проверки максимальной длины строки.
 * @param length Максимальная длина строки.
 */
export const maxLength =
  (length: number): IValidator =>
  (value) => {
    return value.length <= length;
  };

/**
 * Валидатор для проверки количества слов в строке.
 * @param length Ожидаемое количество слов.
 */
export const wordsCount =
  (length: number): IValidator =>
  (value) => {
    return value.split(' ').length === length;
  };

/**
 * Валидатор для проверки, что длина строки находится в заданном интервале.
 * @param min Минимальная длина строки.
 * @param max Максимальная длина строки.
 */
export const intervalLength =
  (min: number, max: number): IValidator =>
  (value) => {
    return value.length >= min && value.length <= max;
  };

/**
 * Валидатор для проверки даты в формате MM/YY.
 */
export const validDate: IValidator = (value) => {
  const [month, year] = value.split('/').map(Number);
  // Проверка, что месяц находится в диапазоне от 1 до 12, а год в диапазоне от 21 до 26
  return month >= 1 && month <= 12 && year >= 21 && year <= 26;
};


/**
 * Валидатор для проверки значений, только числа.
 */
export const stringOnly: IValidator = (value) => {
  return value.replace(/[0-9]/, '').length === value.length
}

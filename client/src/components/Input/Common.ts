export interface Formatter {
  patternChar: string;
  format: string;
  unformatted?: boolean;
}
/**
 * Функция форматирования значения.
 *
 * @param {string} value - Значение, которое нужно отформатировать.
 * @param {Formatter} formatter - Объект с информацией о форматировании, включая строку формата и символ-заменитель.
 * @param {string[]} [antiPattern=[]] - Необязательный параметр, содержащий символы, которые следует игнорировать при форматировании.
 * @returns {string} - Отформатированная строка.
 */
export const formattingValue = (
  value: string,
  formatter?: Formatter,
  antiPattern: string[] = [],
): string => {
  if (!formatter) {
    return value;
  }
  let formattedValue = '';
  const { format, patternChar } = formatter;
  for (let i = 0, j = 0; i < format.length; i += 1, j += 1) {
    const charFormat = format[i];
    const charInputValue = value?.[j];
    if (charInputValue === undefined) {
      break;
    }

    const includes = antiPattern.includes(charInputValue);
    if (includes) {
      if (charFormat !== patternChar) {
        if (charFormat !== charInputValue) {
          formattedValue = formattedValue.concat(charFormat).concat(charInputValue);
        } else {
          formattedValue = formattedValue.concat(charFormat);
        }
      } else {
        /* Защищает от сдвига маски, в случае, когда onChange происходит до разделителя маски. */
        i -= 1;
      }
    } else if (charFormat === patternChar) {
      formattedValue = formattedValue.concat(charInputValue);
    } else if (charFormat !== charInputValue) {
      formattedValue = formattedValue.concat(charFormat).concat(charInputValue);
    }
  }
  return formattedValue;
};

/**
 * Функция обратного форматирования значения.
 *
 * @param {string} value - Отформатированное значение, которое нужно преобразовать обратно.
 * @param {Formatter} formatter - Объект с информацией о форматировании, включая строку формата и символ-заменитель.
 * @returns {string} - Неотформатированное значение.
 */
export const unFormattingValue = (value: string, formatter?: Formatter): string => {
  if (!formatter) {
    return value;
  }
  const { format, patternChar } = formatter;
  let unFormattedValue = '';
  for (let i = 0; i < format.length; i += 1) {
    const charFormat = format[i];
    const charValue = value?.[i];
    if (charValue !== undefined) {
      if (charFormat === patternChar) {
        unFormattedValue = unFormattedValue.concat(charValue);
      }
    }
  }
  return unFormattedValue;
};

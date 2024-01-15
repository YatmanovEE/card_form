import { intervalLength, required, maxLength, wordsCount, validDate } from './validators';

describe('Проверка интервальной длинны', () => {
  const intervalTest = intervalLength(1, 10);
  test('Значение корректной длины', () => {
    expect(intervalTest('012345')).toBe(true);
  });
  test('Значение максимальной длины', () => {
    expect(intervalTest('0123456789')).toBe(true);
  });
  test('Значение минимальной длины', () => {
    expect(intervalTest('0')).toBe(true);
  });
  test('Значение меньшей длины', () => {
    expect(intervalTest('')).toBe(false);
  });
  test('Значение большей длины ', () => {
    expect(intervalTest('01234567890')).toBe(false);
  });
});

describe('Проверка максимальной длины', () => {
  const maxLengthTest = maxLength(10);
  test('Значение корректной длины', () => {
    expect(maxLengthTest('012345')).toBe(true);
  });
  test('Значение максимальной длины', () => {
    expect(maxLengthTest('0123456789')).toBe(true);
  });
  test('Значение большей длины ', () => {
    expect(maxLengthTest('01234567890')).toBe(false);
  });
});

describe('Проверка обязательности заполнения', () => {
  test('Значение присутствует', () => {
    expect(required('012345')).toBe(true);
  });
  test('Значение отсутствует', () => {
    expect(required('')).toBe(false);
  });
});

describe('Проверка на количество слов', () => {
  const wordsCountTest = wordsCount(2);
  test('Необходимое количество слов', () => {
    expect(wordsCountTest('Test Test')).toBe(true);
  });
  test('Количество слов меньше', () => {
    expect(wordsCountTest('test')).toBe(false);
  });
  test('Количество слов больше', () => {
    expect(wordsCountTest('test test test')).toBe(false);
  });
});

describe('Проверка даты', () => {
  it('Корректная дата', () => {
    const validDateString = '06/23';
    expect(validDate(validDateString)).toBe(true);
  });

  it('Некорректным месяц', () => {
    const invalidMonthDateString = '13/23';
    expect(validDate(invalidMonthDateString)).toBe(false);
  });

  it('Некорректный год', () => {
    const invalidYearDateString = '06/99';
    expect(validDate(invalidYearDateString)).toBe(false);
  });

  it('Некорректным формат', () => {
    const invalidFormatDateString = '0623';
    expect(validDate(invalidFormatDateString)).toBe(false);
  });

  it('Некорректный разделитель', () => {
    const invalidSeparatorDateString = '06-23';
    expect(validDate(invalidSeparatorDateString)).toBe(false);
  });
});

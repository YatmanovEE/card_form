import { intervalLength, required, maxLength, wordsCount } from './validators';

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
  const wordsCountText = wordsCount(2);
  test('Необходимое количество слов', () => {
    expect(wordsCountText('Test Test')).toBe(true);
  });
  test('Количество слов меньше', () => {
    expect(wordsCountText('test')).toBe(false);
  });
  test('Количество слов больше', () => {
    expect(wordsCountText('test test test')).toBe(false);
  });
});

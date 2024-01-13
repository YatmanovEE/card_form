type IValidator = (val: string) => boolean;

export const required: IValidator = (value) => {
  if (!value) {
    return false;
  }
  return true;
};

export const maxLength =
  (length: number): IValidator =>
  (value) => {
    if (value.length > length) {
      return false;
    }
    return true;
  };

export const intervalLength =
  (min: number, max: number): IValidator =>
  (value) => {
    if (value.length < min || value.length > max) {
      return false;
    }

    return true;
  };

import React, { useId } from 'react';
import classes from './Input.module.scss';

interface Formatter {
  patternChar: string;
  format: string;
}

const formattingValue = (value: string, formatter?: Formatter): string => {
  if (!formatter) {
    return value;
  }
  let formattedValue = '';
  const { format, patternChar } = formatter;
  for (let i = 0; i < format.length; i += 1) {
    const charFormat = format[i];
    const charInputValue = value?.[i];
    if (charInputValue !== undefined) {
      if (charFormat === patternChar) {
        formattedValue = formattedValue.concat(charInputValue);
      } else if (charFormat !== charInputValue) {
        formattedValue = formattedValue.concat(charFormat).concat(charInputValue);
      } else {
        formattedValue = formattedValue.concat(charFormat);
      }
    }
  }
  return formattedValue;
};

const unFormattingValue = (value: string, formatter?: Formatter): string => {
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

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  error: Record<string, boolean>;
  fieldName: string;
  label: string;
  hideValue?: boolean;
  formatter?: Formatter | undefined;
  textAlign?: React.CSSProperties['textAlign'];
}

const Input: React.FC<Props> = ({
  error,
  fieldName,
  label,
  formatter,
  inputMode,
  style,
  hideValue,
  textAlign,
  ...props
}) => {
  const id = useId();
  const hasError = error?.[fieldName];
  const [formatValue, setFormatValue] = React.useState<string | number | readonly string[]>(
    props?.value ?? '',
  );

  const changeFormatValue = (
    setStateAction: React.SetStateAction<string | number | readonly string[]>,
  ) => {
    if (hideValue) {
      return setFormatValue((prev) => {
        let newValue = setStateAction;
        if (typeof setStateAction === 'function') {
          newValue = setStateAction(prev);
        }
        return newValue.toString().replaceAll(/./g, '*');
      });
    }
    return setFormatValue(setStateAction);
  };
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const inputValue = e.target.value;
    if (inputMode === 'numeric' && inputValue.toLowerCase() !== inputValue.toUpperCase()) {
      changeFormatValue((prev) => {
        if (prev) {
          return prev;
        }
        return '';
      });
      return;
    }

    changeFormatValue(formattingValue(inputValue, formatter));

    props.onChange({
      ...e,
      target: {
        ...e.target,
        value: unFormattingValue(e.target.value, formatter),
      },
    });
  };
  return (
    <div className={classes.root} style={style}>
      <input
        id={id}
        {...props}
        onChange={handleChange}
        value={formatValue}
        className={`${classes.input} ${hasError ? classes.invalid : classes.valid}`}
        placeholder={props.placeholder ?? ' '}
        type={props.type === 'password' ? 'text' : props.type}
        style={{ textAlign }}
      />
      <span className={classes.inputBorder} />
      <label htmlFor={id} className={classes.label}>
        {label}
      </label>
    </div>
  );
};

export default Input;

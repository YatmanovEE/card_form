import React, { useId } from 'react';
import classes from './Input.module.scss';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  error: Record<string, boolean>;
  fieldName: string;
  label: string;
  hideValue?: boolean;
  formatter?:
    | {
        patternChar: string;
        format: string;
      }
    | undefined;
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
    if (formatter) {
      let formattedValue = '';
      const { format, patternChar } = formatter;
      for (let i = 0; i < format.length; i += 1) {
        const charFormat = format[i];
        const charInputValue = inputValue?.[i];
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
      changeFormatValue(formattedValue);
    } else {
      changeFormatValue(inputValue);
    }
    props.onChange(e);
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

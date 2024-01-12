import React, { useId } from 'react';
import classes from './Input.module.scss';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  error: Record<string, boolean>;
  fieldName: string;
  label: string;
  formatter?:
    | {
        patternChar: string;
        format: string;
      }
    | undefined;
}

const Input: React.FC<Props> = ({ error, fieldName, label, formatter, inputMode, ...props }) => {
  const id = useId();
  const hasError = error?.[fieldName];
  const [formatValue, setFormatValue] = React.useState<string | number | readonly string[]>(
    props?.value ?? '',
  );
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const inputValue = e.target.value;
    if (inputMode === 'numeric' && inputValue.toLowerCase() !== inputValue.toUpperCase()) {
      setFormatValue((prev) => {
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
      setFormatValue(formattedValue);
    } else {
      setFormatValue(inputValue);
    }
    props.onChange(e);
  };
  return (
    <div className={classes.root}>
      <input
        id={id}
        {...props}
        onChange={handleChange}
        value={formatValue}
        className={`${classes.input} ${hasError ? classes.invalid : classes.valid}`}
        placeholder={props.placeholder ?? ' '}
      />
      <span className={classes.inputBorder} />
      <label htmlFor={id} className={classes.label}>
        {label}
      </label>
    </div>
  );
};

export default Input;

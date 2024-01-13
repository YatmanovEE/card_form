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

const Input: React.FC<Props> = ({ error, fieldName, label, formatter, ...props }) => {
  const id = useId();
  const hasError = error?.[fieldName];
  const [formatValue, setFormatValue] = React.useState<string | number | readonly string[]>(
    props?.value ?? '',
  );
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const inputValue = e.target.value;
    if (formatter) {
      const { format, patternChar } = formatter;
      let newFormattedValue = '';
      for (let count = 0; count < inputValue.length; count += 1) {
        const char = format[count];
        if (!char) break;
        if (char === patternChar) {
          newFormattedValue = newFormattedValue.concat(inputValue?.[count]);
        } else {
          newFormattedValue = newFormattedValue.concat(char);
        }
      }

      setFormatValue(newFormattedValue);
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

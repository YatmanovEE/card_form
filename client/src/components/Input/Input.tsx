import React, { useId } from 'react';
import classes from './Input.module.scss';
import { Formatter, formattingValue, unFormattingValue } from './Common';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  error: Record<string, boolean>;
  fieldName: string;
  label: string;
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
  textAlign,
  ...props
}) => {
  const id = useId();
  const hasError = error?.[fieldName];
  const [formatValue, setFormatValue] = React.useState<string | number | readonly string[]>(
    props?.value ?? '',
  );

  const antiPattern: string[] = React.useMemo(() => {
    if (formatter) {
      const { format, patternChar } = formatter;
      const newAntiPattern: string[] = [];
      for (let i = 0; i < format.length; i += 1) {
        const char = format[i];
        if (char !== patternChar) {
          newAntiPattern.push(char);
        }
      }
      return newAntiPattern;
    }
    return [];
  }, [formatter]);

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
    const formattedValue = formattingValue(inputValue, formatter, antiPattern);

    setFormatValue(formattedValue);
    props.onChange({
      ...e,
      target: {
        ...e.target,
        value: formatter?.unformatted
          ? unFormattingValue(formattedValue, formatter)
          : formattedValue,
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
        style={{ textAlign }}
        data-testid='input'
      />
      <span className={classes.inputBorder} />
      <label htmlFor={id} className={classes.label}>
        {label}
      </label>
    </div>
  );
};

export default Input;

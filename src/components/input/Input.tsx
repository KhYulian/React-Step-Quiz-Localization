import styles from "./Input.module.scss";
import React, { InputHTMLAttributes } from "react";

interface CustomInputProps {
  inputProps?: object;
  error?: boolean;
  errorText?: string;
}

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    CustomInputProps {}

const customInputProps: (keyof CustomInputProps)[] = [
  "inputProps",
  "error",
  "errorText",
];

export default function Input(props: InputProps) {
  const defaultInputProps = getDefaultInputProps(props);

  return (
    <div className={styles.control}>
      <input
        {...defaultInputProps}
        {...props.inputProps}
        className={styles["input-error"]}
      />

      {props.error && (
        <span className={styles["error-message"]}>{props.errorText}</span>
      )}
    </div>
  );
}

/**
 * Removes custom input props (e.g. error, errorMessage) from the list of props, leaving only default InputHTMLAttributes
 * @param props
 * @return default InputHTMLAttributes
 */
function getDefaultInputProps(
  props: InputProps,
): InputHTMLAttributes<HTMLInputElement> {
  return (
    Object.keys(props)
      // @ts-ignore
      .filter((key: keyof InputProps) => !customInputProps.includes(key))
      .reduce((obj, key) => {
        // @ts-ignore
        obj[key] = props[key];
        return obj;
      }, {})
  );
}

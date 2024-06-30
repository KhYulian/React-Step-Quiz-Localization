import styles from "./Button.module.scss";
import { ButtonHTMLAttributes } from "react";

type ButtonVariants = "text" | "filled";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariants;
}

export default function Button(props: ButtonProps) {
  return (
    <button
      {...props}
      className={`${styles.button} ${styles[props.variant]} ${props.className || ""}`}
    >
      {props.children}
    </button>
  );
}

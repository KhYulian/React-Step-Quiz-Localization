import styles from "./Card.module.scss";
import { PropsWithChildren } from "react";

interface CardProps extends PropsWithChildren {
  rounded?: boolean;
  selected?: boolean;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

export default function Card({
  rounded,
  children,
  selected,
  onClick,
  className,
  disabled,
}: CardProps) {
  const handleClick = () => {
    if (disabled) return;
    onClick();
  };

  return (
    <div
      onClick={handleClick}
      className={`${styles.Card} ${rounded ? styles.rounded : ""} ${selected ? styles.selected : ""} ${className || ""} ${disabled ? styles.disabled : ""}`}
    >
      {children}
    </div>
  );
}

import styles from "./SingleSelect.module.scss";
import Card from "../../card/Card";
import { PropsWithChildren } from "react";

interface SingleSelectProps extends PropsWithChildren {
  value: string;
  onClick: (value: string) => void;
}

export default function SingleSelect({
  children,
  value,
  onClick,
}: SingleSelectProps) {
  return (
    <Card onClick={() => onClick(value)}>
      <div className={styles.content}>{children ? children : value}</div>
    </Card>
  );
}

import styles from "./SingleImageSelect.module.scss";
import { PropsWithChildren } from "react";
import Card from "../../card/Card";

interface SingleImageSelectProps extends PropsWithChildren {
  value: string;
  image: string;
  onClick: (value: string) => void;
}

export default function SingleImageSelect({
  children,
  value,
  image,
  onClick,
}: SingleImageSelectProps) {
  return (
    <Card onClick={() => onClick(value)}>
      <div className={styles.content}>
        <span className={styles.image}>{image}</span>
        {children ? children : value}
      </div>
    </Card>
  );
}

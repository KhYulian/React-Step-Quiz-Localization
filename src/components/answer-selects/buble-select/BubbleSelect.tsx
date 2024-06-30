import styles from "./BubbleSelect.module.scss";
import { PropsWithChildren, useState } from "react";
import Card from "../../card/Card";

interface BubbleSelectProps extends PropsWithChildren {
  image: string;
  value: string;
  onSelect: (value: string, selected: boolean) => void;
  disabled?: boolean;
}

export default function BubbleSelect({
  children,
  value,
  image,
  disabled,
  onSelect,
}: BubbleSelectProps) {
  const [selected, setChecked] = useState(false);

  const handleChecked = () => {
    if (disabled) return;

    setChecked((prev) => !prev);
    onSelect(value, !selected);
  };

  return (
    <Card
      onClick={handleChecked}
      selected={selected}
      disabled={disabled}
      rounded
    >
      <div className={styles.content}>
        <span className={styles.image}>{image}</span>
        <span className={styles.text}>{children ? children : value}</span>
      </div>
    </Card>
  );
}

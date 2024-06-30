import styles from "./MultipleSelect.module.scss";
import Card from "../../card/Card";
import { PropsWithChildren, useState } from "react";

interface MultipleSelectProps extends PropsWithChildren {
  value: string;
  onChange: (value: string, checked: boolean) => void;
}

export default function MultipleSelect({
  value,
  onChange,
  children,
}: MultipleSelectProps) {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
    onChange(value, !checked);
  };

  return (
    <Card onClick={handleChange} selected={checked}>
      <div className={styles.content}>
        <span>{children ? children : value}</span>
        <input
          onChange={handleChange}
          type="checkbox"
          value={value}
          checked={checked}
          className={styles.checkbox}
        />
      </div>
    </Card>
  );
}

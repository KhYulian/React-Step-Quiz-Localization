import styles from "./StepProgress.module.scss";

interface StepProgressProps {
  currentStep: number;
  maxStep: number;
}

export default function StepProgress({
  currentStep,
  maxStep,
}: StepProgressProps) {
  const progressInPercent = Math.ceil((currentStep / (maxStep + 1)) * 100);

  return (
    <div className={styles.StepProgress}>
      <div className={styles.step}>
        <span className={styles["current-step"]}>{currentStep}</span>
        <span>/</span>
        <span className={styles["max-step"]}>{maxStep}</span>
      </div>
      <div className={styles["progress-bar"]}>
        <div
          style={{ width: `${progressInPercent}%` }}
          className={styles["progress-bar--filled"]}
        ></div>
      </div>
    </div>
  );
}

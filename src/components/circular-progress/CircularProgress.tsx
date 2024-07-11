import styles from "./CircularProgress.module.scss";
import { useEffect, useState } from "react";

interface CircularProgressProps {
  size?: number;
  strokeWidth?: number;
  duration?: number;
  onLoaded?: () => void;
}

const DEFAULT_DURATION = 5000;
const DEFAULT_SIZE = 50;
const DEFAULT_STROKE_WIDTH = 10;
const START_VALUE = 0;
const END_VALUE = 100;

export default function CircularProgress({
  duration = DEFAULT_DURATION,
  size = DEFAULT_SIZE,
  strokeWidth = DEFAULT_STROKE_WIDTH,
  onLoaded,
}: CircularProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let start = START_VALUE;

    const interval = setInterval(() => {
      start += 1;
      setProgress(start);
      if (start >= END_VALUE) {
        clearInterval(interval);

        if (typeof onLoaded === "function") {
          onLoaded();
        }
      }
    }, duration / END_VALUE);

    return () => clearInterval(interval);
  }, [duration, onLoaded]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / END_VALUE) * circumference;

  return (
    <div className={styles.container}>
      <svg width={size} height={size} className={styles.circularProgressBar}>
        <circle
          className={styles.background}
          stroke="lightgrey"
          strokeWidth={strokeWidth}
          fill="none"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className={styles.progress}
          stroke="#E4229C"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>

      <span className={styles.percentage}>{progress}%</span>
    </div>
  );
}

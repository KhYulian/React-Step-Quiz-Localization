import styles from "./QuizLayout.module.scss";
import { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";

interface QuizLayoutProps extends PropsWithChildren {
  translationKey: string;
}

export default function QuizLayout({
  children,
  translationKey,
}: QuizLayoutProps) {
  const { t } = useTranslation();

  return (
    <div className={styles.QuizLayout}>
      <header className={styles.header}>
        <h3
          className={styles.title}
          dangerouslySetInnerHTML={{ __html: t(`${translationKey}.title`) }}
        ></h3>
        <p className={styles.subtitle}>
          {t(`${translationKey}.subtitle`, { defaultValue: "" })}
        </p>
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
}

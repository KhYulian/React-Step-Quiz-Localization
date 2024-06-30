import styles from "./QuizPage.module.scss";
import { Outlet } from "react-router-dom";
import StepProgress from "../../components/step-progress/StepProgress";
import { useContext } from "react";
import Button from "../../components/button/Button";
import { MAX_STEP, QuizContext } from "./quiz-context/QuizContext";

export default function QuizPage() {
  const { currentQuestion, previousQuestion } = useContext(QuizContext);

  const isPreviousQuestionBtnShown = currentQuestion >= 3;

  return (
    <div className={styles.QuizPage}>
      <header className={styles.header}>
        {isPreviousQuestionBtnShown && (
          <Button
            onClick={previousQuestion}
            variant="text"
            className={styles["previous-question-btn"]}
          >
            &lt;
          </Button>
        )}
        <StepProgress currentStep={currentQuestion} maxStep={MAX_STEP} />
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

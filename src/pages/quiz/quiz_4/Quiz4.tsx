import styles from "./Quiz4.module.scss";
import QuizLayout from "../quiz-layout/QuizLayout";
import MultipleSelect from "../../../components/answer-selects/multiple-select/MultipleSelect";
import { useTranslation } from "react-i18next";
import { useContext, useState } from "react";
import Button from "../../../components/button/Button";
import { QuizContext } from "../quiz-context/QuizContext";
import { AnswerTypes } from "../../../constants/misc/answer-types";

const QUIZ_4_TRANSLATION_KEY = "quiz_4";

const answerTranslationKeys = [
  "lack_of_logic",
  "slow_speed",
  "lack_of_humor",
  "generic_ending",
];

export default function Quiz4() {
  const { t } = useTranslation();
  const { nextQuestion } = useContext(QuizContext);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleChange = (value: string, checked: boolean) => {
    if (checked) {
      setAnswers((prev) => [...prev, value]);
    } else {
      setAnswers((prev) => prev.filter((answer) => answer !== value));
    }
  };

  const handleNext = () => {
    if (answers.length === 0) return;

    nextQuestion({
      order: 4,
      answer: answers.join(";"),
      type: AnswerTypes.MultipleSelect,
      title: t(`${QUIZ_4_TRANSLATION_KEY}.title`).replace(/(<([^>]+)>)/gi, ""),
    });
  };

  return (
    <QuizLayout translationKey={QUIZ_4_TRANSLATION_KEY}>
      <div className={styles["answer-list"]}>
        {answerTranslationKeys.map((translationKey, index) => (
          <MultipleSelect
            key={index}
            value={t(`${QUIZ_4_TRANSLATION_KEY}.${translationKey}`)}
            onChange={handleChange}
          />
        ))}
      </div>
      <Button
        onClick={handleNext}
        disabled={answers.length === 0}
        variant="filled"
      >
        {t("next_btn")}
      </Button>
    </QuizLayout>
  );
}

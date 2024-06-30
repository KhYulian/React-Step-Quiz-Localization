import styles from "../quiz_1/Quiz1.module.scss";
import QuizLayout from "../quiz-layout/QuizLayout";
import SingleSelect from "../../../components/answer-selects/single-select/SingleSelect";
import { useTranslation } from "react-i18next";
import { ageGroups } from "../../../constants/misc/age-groups";
import { useContext } from "react";
import { QuizContext } from "../quiz-context/QuizContext";
import { AnswerTypes } from "../../../constants/misc/answer-types";

const QUIZ_3_TRANSLATION_KEY = "quiz_3";

export default function Quiz3() {
  const { t } = useTranslation();
  const { nextQuestion } = useContext(QuizContext);

  const handleClick = (value: string) => {
    nextQuestion({
      order: 3,
      type: AnswerTypes.SingleSelect,
      answer: value,
      title: t(`${QUIZ_3_TRANSLATION_KEY}.title`),
    });
  };

  return (
    <QuizLayout translationKey={QUIZ_3_TRANSLATION_KEY}>
      <div className={styles["answer-list"]}>
        {ageGroups.map(({ start_age, end_age }) => (
          <SingleSelect
            key={`${start_age}-${end_age}`}
            value={
              end_age
                ? t(`${QUIZ_3_TRANSLATION_KEY}.age_range`, {
                    start_age,
                    end_age,
                  })
                : `${start_age}+`
            }
            onClick={handleClick}
          />
        ))}
      </div>
    </QuizLayout>
  );
}

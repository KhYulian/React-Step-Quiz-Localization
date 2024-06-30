import styles from "./Quiz1.module.scss";
import QuizLayout from "../quiz-layout/QuizLayout";
import { LanguageLabels } from "../../../constants/languages/language-labels";
import SingleSelect from "../../../components/answer-selects/single-select/SingleSelect";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { QuizContext } from "../quiz-context/QuizContext";
import { AnswerTypes } from "../../../constants/misc/answer-types";

const QUIZ_1_TRANSLATION_KEY = "quiz_1";

export default function Quiz1() {
  const { i18n, t } = useTranslation();
  const { nextQuestion } = useContext(QuizContext);

  const handleClick = (value: string) => {
    i18n.changeLanguage(value).then(() =>
      nextQuestion({
        order: 1,
        type: AnswerTypes.SingleSelect,
        answer: value,
        title: t(`${QUIZ_1_TRANSLATION_KEY}.title`),
      }),
    );
  };

  return (
    <QuizLayout translationKey={QUIZ_1_TRANSLATION_KEY}>
      <div className={styles["answer-list"]}>
        {Object.entries(LanguageLabels).map(([languageCode, languageLabel]) => (
          <SingleSelect
            key={languageCode}
            value={languageCode}
            onClick={handleClick}
          >
            {languageLabel}
          </SingleSelect>
        ))}
      </div>
    </QuizLayout>
  );
}

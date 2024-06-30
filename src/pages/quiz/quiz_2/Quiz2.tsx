import styles from "./Quiz2.module.scss";
import QuizLayout from "../quiz-layout/QuizLayout";
import SingleImageSelect from "../../../components/answer-selects/single-image-select/SingleImageSelect";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { QuizContext } from "../quiz-context/QuizContext";
import { AnswerTypes } from "../../../constants/misc/answer-types";

interface Quiz2AnswerOption {
  image: string;
  translationKey: string;
}

const QUIZ_2_TRANSLATION_KEY = "quiz_2";

const answerOptions: Quiz2AnswerOption[] = [
  {
    image: "👩",
    translationKey: `${QUIZ_2_TRANSLATION_KEY}.female`,
  },
  { image: "👨", translationKey: `${QUIZ_2_TRANSLATION_KEY}.male` },
  { image: "😉", translationKey: `${QUIZ_2_TRANSLATION_KEY}.other` },
];

export default function Quiz2() {
  const { t } = useTranslation();
  const { nextQuestion } = useContext(QuizContext);

  const handleClick = (value: string) => {
    nextQuestion({
      order: 2,
      type: AnswerTypes.SingleSelect,
      answer: value,
      title: t(`${QUIZ_2_TRANSLATION_KEY}.title`),
    });
  };

  return (
    <QuizLayout translationKey={QUIZ_2_TRANSLATION_KEY}>
      <div className={styles.content}>
        {answerOptions.map(({ image, translationKey }) => (
          <SingleImageSelect
            key={translationKey}
            value={t(translationKey)}
            image={image}
            onClick={handleClick}
          />
        ))}
      </div>
    </QuizLayout>
  );
}

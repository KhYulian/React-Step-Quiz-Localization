import styles from "./Quiz5.module.scss";
import QuizLayout from "../quiz-layout/QuizLayout";
import BubbleSelect from "../../../components/answer-selects/buble-select/BubbleSelect";
import { useTranslation } from "react-i18next";
import { useContext, useState } from "react";
import Button from "../../../components/button/Button";
import { QuizContext } from "../quiz-context/QuizContext";
import { localStorageService } from "../../../services/common/local-storage.service";
import { LocalStorageKeys } from "../../../constants/misc/locale-storage-keys";
import { Steps } from "../../../constants/misc/steps";
import { AnswerTypes } from "../../../constants/misc/answer-types";

interface Quiz5Answer {
  image: string;
  translationKey: string;
}

const answerOptions: Quiz5Answer[] = [
  { image: "🐺", translationKey: "werewolf" },
  { image: "💃", translationKey: "action" },
  { image: "🫅", translationKey: "royal_obsession" },
  { image: "🥰", translationKey: "romance" },
  { image: "👨", translationKey: "young_adult" },
  { image: "🤠", translationKey: "bad_boy" },
  { image: "🤑", translationKey: "billionaire" },
];

const QUIZ_5_TRANSLATION_KEY = "quiz_5";
const MAX_ANSWERS = 3;

export default function Quiz5() {
  const { t } = useTranslation();
  const { nextQuestion } = useContext(QuizContext);
  const [answers, setAnswers] = useState<string[]>([]);

  const middleIndexOfAnswersArray = Math.ceil(answerOptions.length / 2);

  const isSelected = (value: string) =>
    answers.find((answer) => answer === value);

  const isMaxAnswersReached = () => answers.length >= MAX_ANSWERS;

  const handleSelected = (value: string, selected: boolean) => {
    if (selected) {
      setAnswers((prev) => [...prev, value]);
    } else {
      setAnswers((prev) => prev.filter((answer) => answer !== value));
    }
  };

  const handleNext = () => {
    if (answers.length === 0) return;
    nextQuestion({
      order: 5,
      type: AnswerTypes.Bubble,
      answer: answers.join(";"),
      title: t(`${QUIZ_5_TRANSLATION_KEY}.title`),
    });
    localStorageService.setItem(LocalStorageKeys.CurrentStep, Steps.Loader);
  };

  const renderBubbleSelect = (image: string, translationKey: string) => {
    const value = t(`${QUIZ_5_TRANSLATION_KEY}.${translationKey}`);

    return (
      <BubbleSelect
        key={translationKey}
        disabled={!isSelected(value) && isMaxAnswersReached()}
        image={image}
        value={value}
        onSelect={handleSelected}
      />
    );
  };

  return (
    <QuizLayout translationKey={QUIZ_5_TRANSLATION_KEY}>
      <div className={styles["answer-list"]}>
        <div className={styles.row}>
          {answerOptions
            .slice(0, middleIndexOfAnswersArray)
            .map(({ image, translationKey }) =>
              renderBubbleSelect(image, translationKey),
            )}
        </div>

        <div className={styles.row}>
          {answerOptions
            .slice(middleIndexOfAnswersArray)
            .map(({ image, translationKey }) =>
              renderBubbleSelect(image, translationKey),
            )}
        </div>
      </div>

      <Button
        onClick={handleNext}
        variant="filled"
        className={styles["next-btn"]}
        disabled={answers.length === 0}
      >
        {t("next_btn")}
      </Button>
    </QuizLayout>
  );
}

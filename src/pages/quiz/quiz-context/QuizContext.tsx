import React, { createContext, useState } from "react";
import { localStorageService } from "../../../services/common/local-storage.service";
import { LocalStorageKeys } from "../../../constants/misc/locale-storage-keys";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../constants/routing/app-routes";
import { AnswerEntity } from "../../../types/entity/answer/answer.entity";
import { dbInstance } from "../../../services/common/db.service";

export const MAX_STEP = 5;

interface QuizContextType {
  currentQuestion: number;
  nextQuestion: (answer: AnswerEntity) => void;
  previousQuestion: () => void;
}

export const QuizContext = createContext<QuizContextType>({
  currentQuestion: 1,
  nextQuestion: (answer: AnswerEntity) => {},
  previousQuestion: () => {},
});

export const QuizContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(
    Number(
      localStorageService.getItem(LocalStorageKeys.CurrentQuizQuestion) || 1,
    ),
  );
  const navigate = useNavigate();

  const nextQuestion = (answer: AnswerEntity) => {
    dbInstance.saveAnswer(answer);
    localStorageService.setItem(
      LocalStorageKeys.CurrentQuizQuestion,
      String(currentQuestion === MAX_STEP ? MAX_STEP : currentQuestion + 1),
    );

    if (currentQuestion < MAX_STEP) {
      setCurrentQuestion((prev) => prev + 1);
      navigate(`/${AppRoutes.quiz}/${currentQuestion + 1}`);
    } else {
      navigate(`/${AppRoutes.loader}`);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion((prev) => prev - 1);
      localStorageService.setItem(
        LocalStorageKeys.CurrentQuizQuestion,
        String(currentQuestion - 1),
      );
      dbInstance.removeAnswer(currentQuestion - 1);
      navigate(`/${AppRoutes.quiz}/${currentQuestion - 1}`);
    } else {
      return;
    }
  };

  return (
    <QuizContext.Provider
      value={{
        currentQuestion: Number(currentQuestion),
        nextQuestion: nextQuestion,
        previousQuestion: previousQuestion,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

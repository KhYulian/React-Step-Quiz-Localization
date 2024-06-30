import { localStorageService } from "../services/common/local-storage.service";
import { LocalStorageKeys } from "../constants/misc/locale-storage-keys";
import { AnswerEntity } from "../types/entity/answer/answer.entity";

export function getCSVAnswers() {
  const columns = ["order", "title", "type", "answer"];
  const answers = localStorageService.getItem<AnswerEntity[]>(
    LocalStorageKeys.Answers,
  );
  if (!Array.isArray(answers)) {
    return [];
  }
  const parsedAnswers = answers.map((answer) => [
    answer.order,
    answer.title,
    answer.type,
    answer.answer,
  ]);
  return [columns, ...parsedAnswers];
}

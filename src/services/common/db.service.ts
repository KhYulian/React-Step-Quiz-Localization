import { AnswerEntity } from "../../types/entity/answer/answer.entity";
import { localStorageService } from "./local-storage.service";
import { LocalStorageKeys } from "../../constants/misc/locale-storage-keys";

let dbInstance: DB;

abstract class DB {
  abstract saveAnswer(answer: AnswerEntity): void;
  abstract removeAnswer(id: number): void;
  abstract dropAnswers(): void;
}

class LocalDB extends DB {
  saveAnswer(answer: AnswerEntity) {
    const currentAnswers = localStorageService.getItem(
      LocalStorageKeys.Answers,
    );

    if (Array.isArray(currentAnswers)) {
      localStorageService.setItem(LocalStorageKeys.Answers, [
        ...currentAnswers,
        answer,
      ]);
    } else {
      localStorageService.setItem(LocalStorageKeys.Answers, [answer]);
    }
  }

  removeAnswer(id: number) {
    const currentAnswers = localStorageService.getItem<AnswerEntity[] | null>(
      LocalStorageKeys.Answers,
    );

    if (!Array.isArray(currentAnswers)) return;

    const filteredAnswers = currentAnswers.filter(
      (answer) => answer.order !== id,
    );

    localStorageService.setItem(LocalStorageKeys.Answers, filteredAnswers);
  }

  dropAnswers() {
    localStorageService.setItem(LocalStorageKeys.Answers, []);
  }
}

class RemoteDB extends DB {
  saveAnswer() {
    // Implement method to save to the REST API
    throw new Error("Not Implemented!");
  }

  removeAnswer(id: number) {
    // Implement method to remove answer
    throw new Error("Not Implemented!");
  }

  dropAnswers() {
    // Implement method to remove answer
    throw new Error("Not Implemented!");
  }
}

if (process.env.NODE_ENV === "development") {
  dbInstance = new LocalDB();
} else {
  dbInstance = new RemoteDB();
}

export { dbInstance };

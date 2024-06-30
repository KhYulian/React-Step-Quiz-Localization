import { AnswerTypes } from "../../../constants/misc/answer-types";

export interface AnswerEntity {
  order: number;
  title: string;
  type: AnswerTypes;
  answer: string;
}

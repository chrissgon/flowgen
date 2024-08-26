import {
  DEFAULT_STEP_NAME,
  ERR_CANNOT_REMOVE_DEFAULT_STEP,
  ERR_INVALID_STEP_ANSWER,
  ERR_INVALID_STEP_NAME,
  ERR_REMOVE_NEXT_STEP,
  ERR_UNKNOWN_DEFAULT_NEXT_STEP,
  ERR_UNKNOWN_STEP_ACTION,
} from './constants';
import { EStepActions, IStep, IStepNextMap } from './interfaces';

export class Step implements IStep {
  readonly name: string;
  readonly action: EStepActions;
  private next: IStepNextMap;

  constructor(name: string, action: EStepActions, next: IStepNextMap) {
    this.name = name;
    this.action = action;
    this.next = next;
  }

  addNext(answer: string, stepName: string): IStepNextMap | Error {
    if (answer.trim() === '') {
      return ERR_INVALID_STEP_ANSWER;
    }
    if (stepName.trim() === '') {
      return ERR_INVALID_STEP_NAME;
    }

    this.next.set(answer, stepName);

    return this.next;
  }

  getNext(): IStepNextMap {
    return this.next;
  }

  verify(): void | Error {
    if (this.name.trim() === '') {
      return ERR_INVALID_STEP_NAME;
    }
    if (!Object.values(EStepActions).includes(this.action)) {
      return ERR_UNKNOWN_STEP_ACTION;
    }
    if (!this.next.has(DEFAULT_STEP_NAME)) {
      return ERR_UNKNOWN_DEFAULT_NEXT_STEP;
    }
    if (this.next.get(DEFAULT_STEP_NAME)?.trim() === '') {
      return ERR_UNKNOWN_DEFAULT_NEXT_STEP;
    }
  }

  removeNext(answer: string): void | Error {
    if (answer === DEFAULT_STEP_NAME) {
      return ERR_CANNOT_REMOVE_DEFAULT_STEP;
    }
    if (!this.next.delete(answer)) {
      return ERR_REMOVE_NEXT_STEP;
    }
  }
}

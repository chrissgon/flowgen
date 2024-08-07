import {
  DEFAULT_STEP_NAME,
  ERR_INVALID_STEP_NAME,
  ERR_UNKNOWN_DEFAULT_NEXT_STEP,
  ERR_UNKNOWN_STEP_ACTION,
} from './constants';
import { EStepActions, IStep, IStepNextMap } from './interfaces';

export class Step implements IStep {
  readonly name: string;
  readonly action: EStepActions;
  readonly next: IStepNextMap;

  constructor(name: string, action: EStepActions, next: IStepNextMap) {
    this.name = name;
    this.action = action;
    this.next = next;
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
  }

  // addNext(name): void {
  //   this.next[next]
  // }
}

// const map = new Map<string, string>();

// map.

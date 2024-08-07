import { ERR_REMOVE_STEP } from './constants';
import { IFlow, IStep, IStepMap } from './interfaces';

export class Flow implements IFlow {
  readonly name: string;
  private steps: IStepMap = new Map();

  constructor(name: string) {
    this.name = name;
  }

  getSteps(): IStepMap {
    return this.steps;
  }

  addStep(step: IStep): Error | IStepMap {
    const err = step.verify();

    if (err instanceof Error) {
      return err;
    }

    this.steps.set(step.name, step);

    return this.getSteps();
  }

  removeStep(name: string): void | Error {
    if (!this.steps.delete(name)) {
      return ERR_REMOVE_STEP;
    }
  }

  toJSON(): string {
    return '';
  }

  toYAML(): string {
    return '';
  }
}

import {
  DEFAULT_STEP_NAME,
  ERR_INVALID_STEP_NAME,
  ERR_UNKNOWN_DEFAULT_NEXT_STEP,
  ERR_UNKNOWN_STEP_ACTION,
} from './constants';
import { EStepActions, IFlow, IStep, IStepMap } from './interfaces';

export class FlowBuilder implements IFlow {
  readonly name: string;
  private steps: IStepMap = {};

  constructor(name: string) {
    this.name = name;
  }

  getSteps(): IStepMap {
    return this.steps;
  }

  addStep(step: IStep): Error | IStepMap {
    const err = this.verifyStep(step);

    if (err instanceof Error) {
      return err;
    }

    this.steps[step.name] = step;

    return this.getSteps();
  }

  verifyStep(step: IStep): Error | undefined {
    if (step.name.trim() === '') {
      return ERR_INVALID_STEP_NAME;
    }
    if (!Object.values(EStepActions).includes(step.action)) {
      return ERR_UNKNOWN_STEP_ACTION;
    }
    if (
      typeof step.next[DEFAULT_STEP_NAME] === 'undefined' ||
      step.next[DEFAULT_STEP_NAME]?.trim() === ''
    ) {
      return ERR_UNKNOWN_DEFAULT_NEXT_STEP;
    }
  }

  removeStep(name: string): IStepMap {
    delete this.steps[name];
    return this.getSteps();
  }
}

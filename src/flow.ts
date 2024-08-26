import { ERR_REMOVE_STEP } from './constants';
import { IFlow, IStep, IStepMap } from './interfaces';
import YAML from 'yaml';

export class Flow implements IFlow {
  readonly name: string;
  private steps: IStepMap = new Map();

  constructor(name: string) {
    this.name = name;
  }

  addStep(step: IStep): Error | IStepMap {
    const err = step.verify();

    if (err instanceof Error) {
      return err;
    }

    this.steps.set(step.name, step);

    return this.getSteps();
  }

  getSteps(): IStepMap {
    return this.steps;
  }

  removeStep(stepName: string): void | Error {
    if (!this.steps.delete(stepName)) {
      return ERR_REMOVE_STEP;
    }
  }

  toJSON(): string {
    const mapToObject = (map: IStepMap) => Object.fromEntries(map.entries());

    return JSON.stringify(
      {
        name: this.name,
        steps: this.getSteps(),
      },
      (_, value) => (value instanceof Map ? mapToObject(value) : value),
    );
  }

  toYAML(): string {
    const doc = new YAML.Document();
    // @ts-expect-error expected type error
    doc.contents = this.#toObject();
    return doc.toString();
  }

  #toObject(): object {
    return JSON.parse(this.toJSON());
  }
}

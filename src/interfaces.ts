export interface IFlow {
  name: string;

  addStep(step: IStep): Error | IStepMap;
  getSteps(): IStepMap;
  removeStep(stepName: string): void | Error;
  toJSON(): string;
  toYAML(): string;
}

export interface IStep {
  name: string;
  action: EStepActions;

  addNext(answer: string, stepName: string): IStepNextMap | Error;
  getNext(): IStepNextMap;
  removeNext(answer: string): void | Error;
  verify(): void | Error;
}

export interface IStepNextMap extends Map<string, string> {}

export interface IStepMap extends Map<string, IStep> {}

export enum EStepActions {
  Button = 'Button',
  File = 'File',
  Input = 'Input',
  Text = 'Text',
  Wait = 'Wait',
  Room = 'Room',
}

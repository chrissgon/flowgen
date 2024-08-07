export interface IFlow {
  name: string;

  getSteps(): IStepMap;
  addStep(step: IStep): Error | IStepMap;
  removeStep(name: string): void | Error;
  toJSON(): string;
  toYAML(): string;
}

export interface IStep {
  name: string;
  action: EStepActions;
  next: IStepNextMap;

  verify(): void | Error;
  // addNext(name: string): void;
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

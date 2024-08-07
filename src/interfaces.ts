export interface IFlow {
  name: string;
  getSteps(): { [i: string]: IStep };
}

export interface IStep {
  name: string;
  action: EStepActions;
  next: IStepNext;
}

export interface IStepNext {
  [i: string]: string;
}

export interface IStepMap {
  [i: string]: IStep;
}

export enum EStepActions {
  Button = 'Button',
  File = 'File',
  Input = 'Input',
  Text = 'Text',
  Wait = 'Wait',
  Room = 'Room',
}

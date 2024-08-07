import {
  DEFAULT_STEP_NAME,
  EStepActions,
  IStep,
  IStepMap,
  IStepNextMap,
  Step,
} from '../src';

export const VALID_FLOW_NAME: string = 'flow name';
export const VALID_STEP_NAME: string = 'step name';
export const VALID_STEP_NEXT: IStepNextMap = new Map([
  [DEFAULT_STEP_NAME, VALID_STEP_NAME],
]);
export const VALID_STEP: IStep = new Step(
  VALID_STEP_NAME,
  EStepActions.Text,
  VALID_STEP_NEXT,
);
export const VALID_STEP_MAP: IStepMap = new Map([
  [VALID_STEP_NAME, VALID_STEP],
]);

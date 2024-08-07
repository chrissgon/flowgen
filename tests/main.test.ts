import { describe, it } from 'node:test';
import assert from 'node:assert';
import { FlowBuilder } from './../src/main';
import {
  ERR_INVALID_STEP_NAME,
  ERR_UNKNOWN_DEFAULT_NEXT_STEP,
  ERR_UNKNOWN_STEP_ACTION,
} from '../src/constants';
import { EStepActions, IStep, IStepNext } from '../src/interfaces';

const FLOW_NAME: string = 'flow name';
const STEP_NAME: string = 'step name';
const STEP_NEXT: IStepNext = { default: 'step' };
const STEP_VALID: IStep = {
  name: STEP_NAME,
  action: EStepActions.Text,
  next: STEP_NEXT,
};

describe('FlowBuilder Suite Tests', () => {
  it('should pass because the flow name is correct', () => {
    const flow = new FlowBuilder(FLOW_NAME);

    assert.equal(flow.name, FLOW_NAME);
  });
  it('verifyStep should return an error because step is invalid', () => {
    const flow = new FlowBuilder(FLOW_NAME);

    let err = flow.verifyStep({
      name: '',
      action: EStepActions.Text,
      next: {},
    });

    assert.strictEqual(err, ERR_INVALID_STEP_NAME);

    err = flow.verifyStep({
      name: STEP_NAME,
      action: 'Action' as EStepActions,
      next: {},
    });

    assert.strictEqual(err, ERR_UNKNOWN_STEP_ACTION);

    err = flow.verifyStep({
      name: STEP_NAME,
      action: EStepActions.Text,
      next: {},
    });

    assert.strictEqual(err, ERR_UNKNOWN_DEFAULT_NEXT_STEP);
  });
  it('verifyStep should return an undefined because step is valid', () => {
    const flow = new FlowBuilder(FLOW_NAME);

    const err = flow.verifyStep(STEP_VALID);

    assert.equal(err, undefined);
  });
  it('addStep should return an error because step is invalid', () => {
    const flow = new FlowBuilder(FLOW_NAME);

    const have = flow.addStep({
      name: '',
      action: EStepActions.Text,
      next: {},
    });

    assert.ok(have instanceof Error);
  });
  it('addStep should add step and return an undefined because step is valid', () => {
    const flow = new FlowBuilder(FLOW_NAME);

    const have = flow.addStep(STEP_VALID);

    assert.deepEqual(have, {
      [STEP_NAME]: STEP_VALID,
    });
  });
  it('getSteps should return a list of steps', () => {
    const flow = new FlowBuilder(FLOW_NAME);

    flow.addStep(STEP_VALID);

    assert.deepEqual(flow.getSteps(), {
      [STEP_NAME]: STEP_VALID,
    });
  });
  it('removeStep should remove step and return a list of steps', () => {
    const flow = new FlowBuilder(FLOW_NAME);

    flow.addStep(STEP_VALID);
    flow.removeStep(STEP_NAME);

    assert.deepStrictEqual(flow.getSteps(), {});
  });
});

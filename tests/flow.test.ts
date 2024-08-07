import { describe, it } from 'node:test';
import assert from 'node:assert';
import { Flow, Step, EStepActions, ERR_REMOVE_STEP } from '../src';
import {
  VALID_FLOW_NAME,
  VALID_STEP,
  VALID_STEP_MAP,
  VALID_STEP_NAME,
} from './mocks';

describe('Flow Suite Tests', () => {
  it('should pass because the flow name is correct', () => {
    const flow = new Flow(VALID_FLOW_NAME);

    assert.equal(flow.name, VALID_FLOW_NAME);
  });
  it('addStep should return an error because step is invalid', () => {
    const flow = new Flow(VALID_FLOW_NAME);

    const have = flow.addStep(new Step('', EStepActions.Text, new Map()));

    assert.ok(have instanceof Error);
  });
  it('addStep should add step and return a map because step is valid', () => {
    const flow = new Flow(VALID_FLOW_NAME);

    const have = flow.addStep(VALID_STEP);

    assert.deepEqual(have, VALID_STEP_MAP);
  });
  it('getSteps should return a map', () => {
    const flow = new Flow(VALID_FLOW_NAME);

    flow.addStep(VALID_STEP);

    assert.deepEqual(flow.getSteps(), VALID_STEP_MAP);
  });
  it('removeStep should return an error because step do not exists', () => {
    const flow = new Flow(VALID_FLOW_NAME);

    const err = flow.removeStep(VALID_STEP_NAME);

    assert.deepEqual(err, ERR_REMOVE_STEP);
  });
});

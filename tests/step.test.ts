import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  Step,
  ERR_INVALID_STEP_NAME,
  ERR_UNKNOWN_DEFAULT_NEXT_STEP,
  ERR_UNKNOWN_STEP_ACTION,
  EStepActions,
} from '../src';

import { VALID_STEP_NAME, VALID_STEP_NEXT } from './mocks';

describe('Step Suite Tests', () => {
  it('verify should return an error because step name is invalid', () => {
    const step = new Step('', EStepActions.Text, VALID_STEP_NEXT);

    assert.strictEqual(step.verify(), ERR_INVALID_STEP_NAME);
  });
  it('verify should return an error because step action is invalid', () => {
    const step = new Step(
      VALID_STEP_NAME,
      'Action' as EStepActions,
      VALID_STEP_NEXT,
    );

    assert.strictEqual(step.verify(), ERR_UNKNOWN_STEP_ACTION);
  });
  it('verify should return an error because step next is invalid', () => {
    const step = new Step(VALID_STEP_NAME, EStepActions.Text, new Map());

    assert.strictEqual(step.verify(), ERR_UNKNOWN_DEFAULT_NEXT_STEP);
  });
  it('verify should return void because step is valid', () => {
    const step = new Step(VALID_STEP_NAME, EStepActions.Text, VALID_STEP_NEXT);

    assert.equal(step.verify(), undefined);
  });
});

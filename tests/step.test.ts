import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  Step,
  ERR_INVALID_STEP_NAME,
  ERR_UNKNOWN_DEFAULT_NEXT_STEP,
  ERR_UNKNOWN_STEP_ACTION,
  EStepActions,
  ERR_INVALID_STEP_ANSWER,
  ERR_CANNOT_REMOVE_DEFAULT_STEP,
  DEFAULT_STEP_NAME,
  ERR_REMOVE_NEXT_STEP,
} from '../src';

import { VALID_STEP_ANSWER, VALID_STEP_NAME, VALID_STEP_NEXT } from './mocks';

describe('Step Suite Tests', () => {
  it('verify should return an error because step name is invalid', () => {
    const step = new Step('', EStepActions.Text, new Map(VALID_STEP_NEXT));

    assert.deepStrictEqual(step.verify(), ERR_INVALID_STEP_NAME);
  });
  it('verify should return an error because step action is invalid', () => {
    const step = new Step(
      VALID_STEP_NAME,
      'Action' as EStepActions,
      new Map(VALID_STEP_NEXT),
    );

    assert.deepStrictEqual(step.verify(), ERR_UNKNOWN_STEP_ACTION);
  });
  it('verify should return an error because step next is invalid', () => {
    const step = new Step(VALID_STEP_NAME, EStepActions.Text, new Map());

    assert.deepStrictEqual(step.verify(), ERR_UNKNOWN_DEFAULT_NEXT_STEP);
  });
  it('verify should return void because step is valid', () => {
    const step = new Step(
      VALID_STEP_NAME,
      EStepActions.Text,
      new Map(VALID_STEP_NEXT),
    );

    assert.equal(step.verify(), undefined);
  });
  it('addNext should return an error because answer is invalid', () => {
    const step = new Step(
      VALID_STEP_NAME,
      EStepActions.Text,
      new Map(VALID_STEP_NEXT),
    );

    assert.deepStrictEqual(step.addNext('', ''), ERR_INVALID_STEP_ANSWER);
  });
  it('addNext should return an error because step name is invalid', () => {
    const step = new Step(
      VALID_STEP_NAME,
      EStepActions.Text,
      new Map(VALID_STEP_NEXT),
    );

    assert.deepStrictEqual(
      step.addNext(VALID_STEP_ANSWER, ''),
      ERR_INVALID_STEP_NAME,
    );
  });
  it('addNext should return a map because step next is valid', () => {
    const step = new Step(
      VALID_STEP_NAME,
      EStepActions.Text,
      new Map(VALID_STEP_NEXT),
    );

    assert.deepStrictEqual(
      step.addNext(VALID_STEP_ANSWER, VALID_STEP_NAME),
      step.getNext(),
    );
    assert.equal(step.getNext().size, 2);
  });
  it('getNext should return a map', () => {
    const step = new Step(
      VALID_STEP_NAME,
      EStepActions.Text,
      new Map(VALID_STEP_NEXT),
    );

    assert.equal(step.getNext().size, 1);
  });
  it('removeNext should return an error because tried remove the default next step', () => {
    const step = new Step(VALID_STEP_NAME, EStepActions.Text, new Map());

    assert.deepStrictEqual(
      step.removeNext(DEFAULT_STEP_NAME),
      ERR_CANNOT_REMOVE_DEFAULT_STEP,
    );
  });
  it('removeNext should return an error because next step does not exists', () => {
    const step = new Step(VALID_STEP_NAME, EStepActions.Text, new Map());

    assert.deepStrictEqual(
      step.removeNext(VALID_STEP_NAME),
      ERR_REMOVE_NEXT_STEP,
    );
  });
  it('removeNext should return void because next step was removed', () => {
    const step = new Step(
      VALID_STEP_NAME,
      EStepActions.Text,
      new Map(VALID_STEP_NEXT),
    );
    step.addNext(VALID_STEP_ANSWER, VALID_STEP_NAME);

    assert.equal(step.removeNext(VALID_STEP_ANSWER), undefined);
    assert.equal(step.getNext().size, 1);
  });
});

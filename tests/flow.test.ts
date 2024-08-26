import { describe, it } from 'node:test';
import assert from 'node:assert';
import { Flow, ERR_REMOVE_STEP } from '../src';
import {
  INVALID_STEP,
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

    assert.ok(flow.addStep(INVALID_STEP) instanceof Error);
  });
  it('addStep should add step and return a map because step is valid', () => {
    const flow = new Flow(VALID_FLOW_NAME);

    assert.deepStrictEqual(flow.addStep(VALID_STEP), VALID_STEP_MAP);
    assert.equal(flow.getSteps().size, 1);
  });
  it('getSteps should return a map', () => {
    const flow = new Flow(VALID_FLOW_NAME);

    flow.addStep(VALID_STEP);

    assert.deepStrictEqual(flow.getSteps(), VALID_STEP_MAP);
    assert.equal(flow.getSteps().size, 1);
  });
  it('removeStep should return an error because step does not exists', () => {
    const flow = new Flow(VALID_FLOW_NAME);

    assert.deepStrictEqual(flow.removeStep(VALID_STEP_NAME), ERR_REMOVE_STEP);
  });
  it('removeStep should return void because step was removed', () => {
    const flow = new Flow(VALID_FLOW_NAME);

    flow.addStep(VALID_STEP);

    assert.equal(flow.removeStep(VALID_STEP_NAME), undefined);
    assert.equal(flow.getSteps().size, 0);
  });
  it('toJSON should return the flow as JSON', () => {
    const flow = new Flow(VALID_FLOW_NAME);

    flow.addStep(VALID_STEP);

    assert.equal(
      flow.toJSON(),
      `{"name":"flow name","steps":{"step name":{"name":"step name","action":"Text","next":{"default":"step name"}}}}`,
    );
  });
  it('toYAML should return the flow as YAML', () => {
    const flow = new Flow(VALID_FLOW_NAME);

    flow.addStep(VALID_STEP);

    assert.equal(
      flow.toYAML(),
      `name: flow name
steps:
  step name:
    name: step name
    action: Text
    next:
      default: step name
`,
    );
  });
});

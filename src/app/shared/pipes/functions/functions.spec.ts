import { deepClone } from './functions';
import { viewLabelName } from './functions';

describe('Functions', () => {

  it('should create label name', () => {
    expect(viewLabelName('checkbox')).toBe('Checkbox label');
  });

  it('should create label name', () => {
    expect(deepClone('string')).toBe('string');
  });
});

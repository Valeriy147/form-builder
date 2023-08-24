import { NameForFormControlPipe } from './name-for-form-control.pipe';

describe('NameForFormControlPipe', () => {
  const pipe = new NameForFormControlPipe();

  it('should transform "border type" to "borderType"', () => {
    expect(pipe.transform('border type')).toBe('borderType');
  });

  it('should transform "background color" to "backgroundColor"', () => {
    expect(pipe.transform('background color')).toBe('backgroundColor');
  });

});

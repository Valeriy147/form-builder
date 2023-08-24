import { Styles } from './../../features/form-builder/store/interfaces';
import { StylesPipe } from './styles.pipe';

describe('StylesPipe', () => {
  const pipe = new StylesPipe();

  it('should transform {fontWeight : 10} to {form-weight : 1000}', () => {
    expect(pipe.transform({ fontWeight: 10 })).toEqual({ 'font-weight': '1000' });
  });

  it('should transform {fontSize : 30} to {font-size : 30px}', () => {
    expect(pipe.transform({ fontSize: 30 })).toEqual({ 'font-size': '30px' });
  });

  it('should transform object of styles to write form', () => {
    let styles: Styles = {
      borderColor: '1',
      textColor: '1',
      width: 1,
      height: 1,
      fontSize: 1,
      fontWeight: 1,
      backgroundColor: '1',
      borderType: '1',
    }
    expect(pipe.transform(styles)).toEqual({
      'border-color': '1',
      'color': '1',
      'width': '1px',
      'height': '1px',
      'font-size': '1px',
      'font-weight': '100',
      'background-color': '1',
      'border-style': '1'
    });
  });

  it('should transform {colorInput : "color"} to {color : "color"}', () => {
    expect(pipe.transform({ colorInput: "color" })).toEqual({ color: "color" });
  });

  it('should not transform {color : "color"}', () => {
    expect(pipe.transform({ color: "color" })).toEqual({ color: "color" });
  });
});

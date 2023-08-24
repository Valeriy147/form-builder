import { Styles } from './../../features/form-builder/store/interfaces';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'style'
})

export class StylesPipe implements PipeTransform {

  transform(styles: Styles): Object {
    let newObj = {}
    let keys = Object.keys(styles)
    for (let key of keys) {
      if (key === 'borderColor') {
        newObj = { ...newObj, ['border-color']: styles['borderColor'] }
      } else if (key === 'textColor') {
        newObj = { ...newObj, ['color']: styles['textColor'] }

      } else if (key === 'width') {
        newObj = { ...newObj, ['width']: styles['width'] + 'px' }

      } else if (key === 'height') {
        newObj = { ...newObj, ['height']: styles['height'] + 'px' }

      } else if (key === 'fontSize') {
        newObj = { ...newObj, ['font-size']: styles['fontSize'] + 'px' }

      } else if (key === 'fontWeight') {
        newObj = { ...newObj, ['font-weight']: styles['fontWeight'] + '00' }

      } else if (key === 'colorInput') {
        newObj = { ...newObj, ['color']: styles['colorInput'] }

      } else if (key === 'backgroundColor') {
        newObj = { ...newObj, ['background-color']: styles['backgroundColor'] }

      } else if (key === 'borderType') {
        newObj = { ...newObj, ['border-style']: styles['borderType'] }

      } else if (key === 'color' && !styles.colorInput) {
        newObj = { ...newObj, ['color']: styles['color'] }
      }
    }

    return newObj;
  }

}

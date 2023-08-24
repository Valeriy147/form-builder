import { Directive } from '@angular/core';

@Directive({
  selector: '[appBaseField]'
})
export abstract class BaseField {

  value!: string | undefined
  label!: string

  onEditorValueChange(event: Event): void { }

  writeValue(value: string): void {
  }

  registerOnChange(fn: (value: string | boolean) => void): void { }

  registerOnTouched(fn: () => void): void {
  }
}

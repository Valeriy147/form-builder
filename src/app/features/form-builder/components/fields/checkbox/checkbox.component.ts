import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, Self, OnInit, OnDestroy, Optional } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ReplaySubject, tap, takeUntil } from 'rxjs';
import { selectSelectedStyles } from '../../../store/form.selectors';
import { BaseField } from 'src/app/shared/directives/base-field.directive';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class CheckboxComponent implements ControlValueAccessor, BaseField, OnInit, OnDestroy {

  @Input() label!: string

  public value: string | undefined;

  selectedStyles$ = this.store.select(selectSelectedStyles)

  onChange = (value: boolean) => { };
  onTouched!: () => void;

  destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(
    @Optional() @Self() private readonly ngControl: NgControl,
    private readonly changeDetector: ChangeDetectorRef,
    private store: Store

  ) {
    if (ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    this.selectedStyles$
      .pipe(
        tap(() => this.value = ''),
        takeUntil(this.destroy),
      ).subscribe()
  }

  public onEditorValueChange(event: Event): void {
    const targetInputElement = event.target as HTMLInputElement;
    const content = targetInputElement.checked;
    console.log(event.target)
    this.onChange(content);
  }

  public writeValue(value: string): void {
    this.value = value;

    this.changeDetector.detectChanges();
  }

  public registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  ngOnDestroy() {
    this.destroy.next(null);
    this.destroy.complete();
  }
}


import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  Self,
  OnInit,
  OnDestroy,
  Optional
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ReplaySubject, tap, takeUntil } from 'rxjs';
import { selectSelectedStyles } from '../../../store/form.selectors';
import { BaseField } from 'src/app/shared/directives/base-field.directive';
import { deepClone } from 'src/app/shared/pipes/functions/functions';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})

export class SelectorComponent implements ControlValueAccessor, BaseField, OnInit, OnDestroy {

  @Input() items!: string[]
  @Input() label!: string

  public value: string | undefined;

  onChange = (value: string) => { };
  onTouched!: () => void;

  selectedStyles$ = this.store.select(selectSelectedStyles)

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
        tap(() => this.value = ""),
        takeUntil(this.destroy),
      ).subscribe()
  }

  public onEditorValueChange(event: Event): void {
    const targetSelectElement = event.target as HTMLSpanElement;
    const content = deepClone(targetSelectElement.textContent);
    console.log(event.target)
    this.onChange(content);
  }

  public writeValue(value: string): void {
    this.value = value;

    this.changeDetector.detectChanges();
  }

  public registerOnChange(fn: (value: string) => void): void {
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


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkDragPlaceholder } from '@angular/cdk/drag-drop';
import { FormBuilderModule } from './features/form-builder/form-builder.module';
import { LoginModule } from './features/login/login.module';
import { FormEffects } from './features/form-builder/store/form.effects';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from './shared/shared.module';
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LoginModule,
    FormBuilderModule,
    SharedModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([FormEffects]),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

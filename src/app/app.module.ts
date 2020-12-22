import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';

import { SharedModule } from './modules/shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { appReducer } from './store/reducers/app.reducer';
import { IndexEffects } from './store/effects/index.effects';
import { HomeComponent } from './components/home/home.component';
import { SettingsComponent } from './components/settings/settings.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, SettingsComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    StoreModule.forRoot({ app: appReducer }),
    EffectsModule.forRoot(IndexEffects),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { PrimeModule } from './prime/prime.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, PrimeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

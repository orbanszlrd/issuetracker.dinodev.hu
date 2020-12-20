import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { LoaderComponent } from './components/loader/loader.component';

import { SanitizeHtmlPipe } from './pipes/sanitize-html.pipe';
import { PrimeModule } from '../prime/prime.module';

@NgModule({
  declarations: [LoaderComponent, SanitizeHtmlPipe],
  imports: [CommonModule, PrimeModule],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeModule,
    LoaderComponent,
    SanitizeHtmlPipe,
  ],
  providers: [DatePipe],
})
export class SharedModule {}

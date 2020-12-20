import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { LoaderComponent } from './components/loader/loader.component';
import { MenubarComponent } from './components/menubar/menubar.component';

import { SanitizeHtmlPipe } from './pipes/sanitize-html.pipe';
import { PrimeModule } from '../prime/prime.module';

@NgModule({
  declarations: [LoaderComponent, SanitizeHtmlPipe, MenubarComponent],
  imports: [CommonModule, PrimeModule],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeModule,
    SanitizeHtmlPipe,
    LoaderComponent,
    MenubarComponent,
  ],
  providers: [DatePipe],
})
export class SharedModule {}

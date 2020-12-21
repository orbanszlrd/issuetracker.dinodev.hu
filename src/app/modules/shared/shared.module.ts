import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { PrimeModule } from '../prime/prime.module';

import { SanitizeHtmlPipe } from './pipes/sanitize-html.pipe';

import { LoaderComponent } from './components/loader/loader.component';
import { MenubarComponent } from './components/menubar/menubar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    LoaderComponent,
    SanitizeHtmlPipe,
    MenubarComponent,
    SidebarComponent,
    ToolbarComponent,
    FooterComponent,
  ],
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
    ToolbarComponent,
    SidebarComponent,
    FooterComponent,
  ],
  providers: [DatePipe],
})
export class SharedModule {}

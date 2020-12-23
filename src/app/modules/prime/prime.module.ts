import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { CheckboxModule } from 'primeng/checkbox';
import { ColorPickerModule } from 'primeng/colorpicker';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { PasswordModule } from 'primeng/password';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RatingModule } from 'primeng/rating';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ToolbarModule } from 'primeng/toolbar';

const Prime = [
  ButtonModule,
  CalendarModule,
  CardModule,
  CarouselModule,
  CheckboxModule,
  ColorPickerModule,
  DialogModule,
  DropdownModule,
  EditorModule,
  InputSwitchModule,
  InputTextModule,
  InputTextareaModule,
  MenubarModule,
  MenuModule,
  PanelModule,
  PasswordModule,
  ProgressBarModule,
  ProgressSpinnerModule,
  RatingModule,
  SidebarModule,
  TableModule,
  TabViewModule,
  ToolbarModule,
];

@NgModule({
  declarations: [],
  imports: [Prime],
  exports: [Prime],
})
export class PrimeModule {}

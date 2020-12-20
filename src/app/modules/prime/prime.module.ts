import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { CheckboxModule } from 'primeng/checkbox';
import { ColorPickerModule } from 'primeng/colorpicker';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MenubarModule } from 'primeng/menubar';
import { PanelModule } from 'primeng/panel';
import { PasswordModule } from 'primeng/password';
import { RatingModule } from 'primeng/rating';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';

const Prime = [
  ButtonModule,
  CalendarModule,
  CardModule,
  CarouselModule,
  CheckboxModule,
  ColorPickerModule,
  DropdownModule,
  EditorModule,
  InputSwitchModule,
  InputTextModule,
  MenubarModule,
  PanelModule,
  PasswordModule,
  RatingModule,
  TableModule,
  TabViewModule,
];

@NgModule({
  declarations: [],
  imports: [Prime],
  exports: [Prime],
})
export class PrimeModule {}

import { Column } from './column.model';

export interface Board {
  title: string;
  description: string;
  columns: Column[];
  createDate?: string;
}

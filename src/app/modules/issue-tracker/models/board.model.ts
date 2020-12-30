import { Column } from './column.model';

export interface Board {
  id?: string;
  title: string;
  slug: string;
  description: string;
  columns: Column[];
  projectId?: string;
  createDate?: Object;
}

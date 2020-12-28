import { Column } from './column.model';

export interface Board {
  id?: string;
  title: string;
  slug: string;
  description: string;
  projectId?: string;
  createDate?: Object;
}

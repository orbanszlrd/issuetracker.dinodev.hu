import { Label } from './label.model';

export interface Issue {
  id?: string;
  title: string;
  slug: string;
  description: string;
  userId?: string;
  createDate?: Object;
}

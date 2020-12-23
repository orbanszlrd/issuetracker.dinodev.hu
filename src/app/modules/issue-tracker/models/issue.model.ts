import { Label } from './label.model';

export interface Issue {
  title: string;
  description: string;
  labels: Label[];
  createDate?: string;
}

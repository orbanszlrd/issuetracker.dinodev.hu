import { Board } from './board.model';

export interface Project {
  id?: string;
  slug: string;
  title: string;
  description: string;
  userId?: string;
  createDate?: Object;
}

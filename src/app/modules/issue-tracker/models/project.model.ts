import { Board } from './board.model';

export interface Project {
  id?: string;
  title: string;
  description: string;
  boards: Board[];
  createDate?: any;
}

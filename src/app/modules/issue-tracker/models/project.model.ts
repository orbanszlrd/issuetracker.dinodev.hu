import { Board } from './board.model';

export interface Project {
  title: string;
  description: string;
  boards: Board[];
  createDate?: string;
}

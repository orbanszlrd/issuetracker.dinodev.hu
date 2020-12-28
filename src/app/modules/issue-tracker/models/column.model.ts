import { Issue } from './issue.model';

export interface Column {
  id?: string;
  title: string;
  description: string;
  boardId: string;
  createDate?: Object;
}

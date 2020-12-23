import { Issue } from './issue.model';

export interface Column {
  title: string;
  description: string;
  issues: Issue[];
  createDate?: string;
}

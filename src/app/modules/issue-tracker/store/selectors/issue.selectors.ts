import { createSelector } from '@ngrx/store';
import { Issue } from '../../models/issue.model';

export const getAllIssues = createSelector(
  (state: any) => state['issuetracker'],
  (issuetracker) => issuetracker.issues.data
);

export const getIssue = createSelector(
  (state: any) => state['issuetracker'],
  (issuetracker: any, props: any) =>
    issuetracker.issues.data.find((f: Issue) => f.slug === props.slug)
);

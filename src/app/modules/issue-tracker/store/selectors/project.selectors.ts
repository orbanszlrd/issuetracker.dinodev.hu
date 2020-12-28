import { createSelector } from '@ngrx/store';
import { Project } from '../../models/project.model';

export const getAllProjects = createSelector(
  (state: any) => state['issuetracker'],
  (issuetracker) => issuetracker.projects.data
);

export const getProject = createSelector(
  (state: any) => state['issuetracker'],
  (issuetracker: any, props: any) =>
    issuetracker.projects.data.find((f: Project) => f.slug === props.slug)
);

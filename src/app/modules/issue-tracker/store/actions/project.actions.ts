import { createAction, props } from '@ngrx/store';

import { Project } from '../../models/project.model';
import { ProjectState } from '../reducers/project.reducer';

export const selectData = createAction('[Projects Page] Select data');

export const selectSuccess = createAction(
  '[Projects Page] Select data success',
  props<ProjectState>()
);

export const insertData = createAction(
  '[Projects Page] Insert data',
  props<{ project: Project }>()
);

export const insertSuccess = createAction('[Projects Page] Successful insert');

export const updateData = createAction(
  '[Projects Page] Update data',
  props<{ project: Project }>()
);

export const updateSuccess = createAction('[Projects Page] Successful update');

export const deleteData = createAction(
  '[Projects Page] Delete data',
  props<{ project: Project }>()
);

export const deleteSuccess = createAction('[Projects Page] Successful delete');

import { createAction, props } from '@ngrx/store';

import { Project } from '../../models/project.model';

export const selectData = createAction('[Projects Page] Select data');

export const selectSuccess = createAction(
  '[Projects Page] Select data success',
  props<{ data: Project[] }>()
);

export const insertData = createAction(
  '[Projects Page] Insert data',
  props<{ project: Project }>()
);

export const insertSuccess = createAction('[Projects Page] Successful insert');

export const deleteData = createAction(
  '[Projects Page] Delete data',
  props<{ id: string }>()
);

export const deleteSuccess = createAction('[Projects Page] Successful delete');

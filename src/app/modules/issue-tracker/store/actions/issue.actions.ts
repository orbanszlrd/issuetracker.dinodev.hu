import { createAction, props } from '@ngrx/store';

import { Issue } from '../../models/issue.model';

export const selectData = createAction('[Issues Page] Select data');

export const selectSuccess = createAction(
  '[Issues Page] Select data success',
  props<{ data: Issue[] }>()
);

export const insertData = createAction(
  '[Issues Page] Insert data',
  props<{ issue: Issue }>()
);

export const insertSuccess = createAction('[Issues Page] Successful insert');

export const deleteData = createAction(
  '[Issues Page] Delete data',
  props<{ issue: Issue }>()
);

export const deleteSuccess = createAction('[Issues Page] Successful delete');

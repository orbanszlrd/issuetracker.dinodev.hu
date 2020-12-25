import { createAction, props } from '@ngrx/store';

import { Project } from '../../models/project.model';

export const getDataFromFirestore = createAction(
  '[Projects Page] Get data from Firestore'
);

export const insertData = createAction(
  '[Projects Page] Insert data',
  props<{ project: Project }>()
);

export const insertSuccess = createAction('[Projects Page] Successful insert');

import { createAction, props } from '@ngrx/store';

import { Project } from '../../models/project.model';

export const getDataFromFirestore = createAction(
  '[Projects Page] Get data from Firestore'
);

export const fillData = createAction(
  '[Projects Page] Fill data',
  props<{ projects: Project[] }>()
);

export const insertData = createAction(
  '[Projects Page] Insert data',
  props<{ project: Project }>()
);

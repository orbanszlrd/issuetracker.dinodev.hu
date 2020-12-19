import { createAction, props } from '@ngrx/store';

export const setIsLoading = createAction(
  '[App Module] Set isLoading',
  props<{ isLoading: boolean }>()
);

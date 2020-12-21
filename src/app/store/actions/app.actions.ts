import { createAction, props } from '@ngrx/store';

export const setIsLoading = createAction(
  '[App Module] set isLoading',
  props<{ isLoading: boolean }>()
);

export const toggleSidebar = createAction('[App Module] toggle Sidebar');

export const hideSidebar = createAction('[App Module] hide Sidebar');

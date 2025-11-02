import { createAction, props } from '@ngrx/store';

export const setCurrentPage = createAction(
  '[Page] Set Current Page',
  props<{ page: string }>()
);

import { createReducer, on } from '@ngrx/store';
import { PageState } from './page-state.model';
import { setCurrentPage } from './page-state.actions';

export const initialState: PageState = {
  currentPage: 'dashboard' // начальное значение
};

export const pageStateReducer = createReducer(
  initialState,
  on(setCurrentPage, (state, { page }) => ({
    ...state,
    currentPage: page
  }))
);

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PageState } from './page-state.model';

export const selectPageState = createFeatureSelector<PageState>('pageState');

export const selectCurrentPage = createSelector(
  selectPageState,
  (state: PageState) => state.currentPage
);

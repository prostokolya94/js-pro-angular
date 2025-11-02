import { ActionReducerMap } from '@ngrx/store';
import { pageStateReducer } from './page-state.reducer';
import {PageState} from './page-state.model';

export interface AppState {
  pageState: PageState;
}

export const reducers: ActionReducerMap<AppState> = {
  pageState: pageStateReducer
};

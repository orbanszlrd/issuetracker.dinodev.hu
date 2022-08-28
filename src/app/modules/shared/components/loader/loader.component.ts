import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/reducers/app.reducer';

import * as AppActions from '../../../../store/actions/app.actions';

import * as appSelectors from '../../../../store/selectors/app.selectors';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  isLoading$: Observable<boolean>;

  constructor(private store: Store<{ app: AppState }>) {
    this.isLoading$ = this.store.select(appSelectors.isLoading);
  }

  loaded(): void {
    this.store.dispatch(AppActions.setIsLoading({ isLoading: false }));
  }

  ngOnInit(): void {
    this.loaded();
  }
}

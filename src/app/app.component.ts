import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as AppActions from './store/actions/app.actions';
import { AppState } from './store/reducers/app.reducer';
import * as appSelectors from './store/selectors/app.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  showSidebar$: Observable<boolean>;

  constructor(private store: Store<{ app: AppState }>) {
    this.showSidebar$ = this.store.select(appSelectors.showSidebar);
  }

  hideSidebar(): void {
    this.store.dispatch(AppActions.hideSidebar());
  }
}

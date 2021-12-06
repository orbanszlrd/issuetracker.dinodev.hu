import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';

import * as AppActions from './store/actions/app.actions';

import * as appSelectors from './store/selectors/app.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  showSidebar$: Observable<boolean>;

  constructor(private store: Store) {
    this.showSidebar$ = this.store.select(appSelectors.showSidebar);
  }

  hideSidebar(): void {
    this.store.dispatch(AppActions.hideSidebar());
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.store
        .select<any>((state: any) => state)
        .subscribe((state: any) => {
          //          console.log(state);
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}

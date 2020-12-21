import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import * as appSelectors from '../../../../store/selectors/app.selectors';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  private subscriptions: Subscription[] = [];

  showSidebar: boolean = false;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.store
        .select(appSelectors.showSidebar)
        .subscribe((showSidebar: boolean) => {
          this.showSidebar = showSidebar;
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}

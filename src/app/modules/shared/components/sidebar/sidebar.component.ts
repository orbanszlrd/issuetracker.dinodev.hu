import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

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
        .select<any>((state: any) => state)
        .subscribe((state: any) => {
          this.showSidebar = state.app.showSidebar;
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}

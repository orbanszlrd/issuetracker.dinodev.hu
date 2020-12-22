import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { MenuItem } from 'primeng/api';

import * as appSelectors from '../../../../store/selectors/app.selectors';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  private subscriptions: Subscription[] = [];

  showSidebar: boolean = false;

  menuItems: MenuItem[] = [];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.menuItems = [
      { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: '/' },
      {
        label: 'Dashboard',
        icon: 'pi pi-fw pi-table',
        routerLink: '/dashboard',
      },
      {
        label: 'Projects',
        icon: 'pi pi-fw pi-folder',
        routerLink: '/projects',
      },
      { label: 'Issues', icon: 'pi pi-fw pi-file', routerLink: '/issues' },
      { label: 'Settings', icon: 'pi pi-fw pi-cog', routerLink: '/settings' },
    ];

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

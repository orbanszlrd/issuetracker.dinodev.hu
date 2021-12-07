import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { MenuItem } from 'primeng/api';

import * as appSelectors from '../../../../store/selectors/app.selectors';
import { AuthService } from 'src/app/modules/firebase/services/auth.service';
import { User } from 'src/app/modules/firebase/services/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  showSidebar: boolean = false;

  menuItems: MenuItem[] = [];

  constructor(private auth: AuthService, private store: Store) {}

  generateMenu(user: User | null | undefined) {
    if (user) {
      this.menuItems = [
        { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: '/' },
        {
          label: 'Dashboard',
          icon: 'pi pi-fw pi-table',
          routerLink: '/issueTracker/dashboard',
        },
        {
          label: 'Projects',
          icon: 'pi pi-fw pi-folder',
          routerLink: '/issueTracker/projects',
        },
        {
          label: 'Issues',
          icon: 'pi pi-fw pi-file',
          routerLink: '/issueTracker/issues',
        },
        {
          label: 'Settings',
          icon: 'pi pi-fw pi-cog',
          routerLink: '/settings',
        },
      ];
    } else {
      this.menuItems = [
        { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: '/' },
        {
          label: 'Settings',
          icon: 'pi pi-fw pi-cog',
          routerLink: '/settings',
        },
      ];
    }
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.auth.user$.subscribe((user) => {
        this.generateMenu(user);
      })
    );

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

import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/modules/firebase/services/auth.service';

import * as AppActions from '../../../../store/actions/app.actions';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  constructor(public auth: AuthService, private store: Store) {}

  toggleSidebar() {
    this.store.dispatch(AppActions.toggleSidebar());
  }
}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AuthGuard } from './modules/firebase/services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'issueTracker',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/issue-tracker/issue-tracker.module').then(
        (m) => m.IssueTrackerModule
      ),
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  {
    path: '**',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

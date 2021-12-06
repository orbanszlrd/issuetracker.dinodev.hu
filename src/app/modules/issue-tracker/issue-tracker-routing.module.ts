import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { IssuesComponent } from './components/issues/issues.component';
import { BoardsComponent } from './components/boards/boards.component';
import { LabelsComponent } from './components/labels/labels.component';
import { BoardComponent } from './components/board/board.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'projects',
    component: ProjectsComponent,
  },
  {
    path: 'projects/:projectSlug',
    component: ProjectsComponent,
  },
  {
    path: 'projects/:projectSlug/boards',
    component: BoardsComponent,
  },
  {
    path: 'projects/:projectSlug/boards/:boardSlug',
    component: BoardComponent,
  },
  {
    path: 'issues',
    component: IssuesComponent,
  },
  {
    path: 'issues/:issueSlug',
    component: IssuesComponent,
  },
  {
    path: 'labels',
    component: LabelsComponent,
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IssueTrackerRoutingModule {}

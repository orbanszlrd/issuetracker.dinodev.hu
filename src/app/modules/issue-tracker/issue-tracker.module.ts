import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../modules/shared/shared.module';

import { IssueTrackerRoutingModule } from './issue-tracker-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { IssuesComponent } from './components/issues/issues.component';
import { BoardsComponent } from './components/boards/boards.component';
import { LabelsComponent } from './components/labels/labels.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProjectsComponent,
    IssuesComponent,
    BoardsComponent,
    LabelsComponent,
  ],
  imports: [CommonModule, IssueTrackerRoutingModule, SharedModule],
})
export class IssueTrackerModule {}

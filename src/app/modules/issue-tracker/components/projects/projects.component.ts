import { Component, OnInit } from '@angular/core';
import { faLeaf } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/modules/firebase/services/auth.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  constructor(public auth: AuthService, private store: Store) {}

  ngOnInit(): void {}

  isOpen: boolean = false;

  project: {
    title: string;
    description: string;
    columns: [];
  } = { title: '', description: '', columns: [] };

  openPanel(): void {
    this.isOpen = true;
  }

  closePanel(): void {
    this.isOpen = false;
  }

  insert(): void {
    console.log('Add new Project');
    console.log(this.project);
    this.isOpen = false;
  }
}

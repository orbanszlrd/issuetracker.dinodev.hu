import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

import firebase from 'firebase/compat/app';
import { v4 as uuidv4 } from 'uuid';

import { Observable, of } from 'rxjs';

import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  projectsCollection: AngularFirestoreCollection<Project>;

  constructor(private afs: AngularFirestore) {
    this.projectsCollection = this.afs.collection('projects');
  }

  getUserId(): string | undefined {
    return firebase.auth().currentUser?.uid;
  }

  select(): Observable<Project[]> {
    this.projectsCollection = this.afs.collection('projects', (ref) =>
      ref.where('userId', '==', this.getUserId()).orderBy('createDate', 'desc')
    );

    return this.projectsCollection.valueChanges();
  }

  create(project: Project): Observable<Project> {
    const id = uuidv4();

    project = {
      id,
      ...project,
      userId: this.getUserId(),
      createDate: firebase.firestore.FieldValue.serverTimestamp(),
    };

    this.projectsCollection.doc(id).set(project);

    return of(project);
  }

  update(project: Project): Observable<Project> {
    this.projectsCollection.doc(project.id).set(project);

    return of(project);
  }

  delete(project: Project): Observable<Project> {
    this.projectsCollection.doc(project.id).delete();

    return of(project);
  }
}

import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

import firebase from 'firebase/compat/app';
import { v4 as uuidv4 } from 'uuid';

import { EMPTY, Observable, of } from 'rxjs';

import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  projectsCollection: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore) {
    this.projectsCollection = this.afs.collection('projects');
  }

  select(): Observable<any> {
    let userId = firebase.auth().currentUser?.uid;

    this.projectsCollection = this.afs.collection('projects', (ref) =>
      ref.where('userId', '==', userId).orderBy('createDate', 'desc')
    );

    return this.projectsCollection.valueChanges();
  }

  create(project: Project): Observable<Project> {
    let id = uuidv4();
    let userId = firebase.auth().currentUser?.uid;

    project = {
      id: id,
      ...project,
      userId: userId,
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

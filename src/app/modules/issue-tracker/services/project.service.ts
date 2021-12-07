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

    this.projectsCollection = this.afs.collection(
      'projects',
      (ref) =>
        ref
          .where('userId', '==', userId)
          //        .orderBy('title', 'asc')
          .orderBy('createDate', 'desc')
      //        .limit(10)
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

    //    this.projectsCollection.add(project);

    this.projectsCollection
      .doc(id)
      .set(project)
      .then(() => {
        console.log('Create Project Success');
      })
      .catch(() => {
        console.log('Create Project Error');
      });

    return of(project);
  }

  update(project: Project): Observable<Project> {
    this.projectsCollection
      .doc(project.id)
      .set(project)
      .then(() => {
        console.log('Update Project Success');
      })
      .catch(() => {
        console.log('Update Project Error');
      });

    return of(project);
  }

  delete(project: Project): Observable<Project> {
    this.projectsCollection
      .doc(project.id)
      .delete()
      .then(() => {
        console.log('Delete Project Success');
      })
      .catch(() => {
        console.log('Delete Project Error');
      });

    return of(project);
  }
}

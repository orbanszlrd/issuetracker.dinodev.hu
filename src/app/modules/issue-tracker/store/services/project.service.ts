import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';

import firebase from 'firebase/app';
import { v4 as uuidv4 } from 'uuid';

import { EMPTY, Observable, of } from 'rxjs';

import { Project } from '../../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  projectsCollection: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore) {
    this.projectsCollection = this.afs.collection('projects');
  }

  insert(project: Project): Observable<any> {
    let id = uuidv4();

    project = {
      id: id,
      ...project,
      createDate: firebase.firestore.FieldValue.serverTimestamp(),
    };

    //    this.projectsCollection.add(project);

    let result = this.projectsCollection
      .doc(id)
      .set(project)
      .then(() => {
        console.log('Success');
      })
      .catch(() => {
        console.log('Error');
      });

    return EMPTY;
  }

  update(): Observable<any> {
    return EMPTY;
  }

  delete(): Observable<any> {
    return EMPTY;
  }
}

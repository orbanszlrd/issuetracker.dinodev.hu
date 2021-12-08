import { Injectable } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

import firebase from 'firebase/compat/app';
import { v4 as uuidv4 } from 'uuid';

import { Observable, of } from 'rxjs';

import { Issue } from '../models/issue.model';

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  issuesCollection: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore) {
    this.issuesCollection = this.afs.collection('issues');
  }

  getUserId() {
    return firebase.auth().currentUser?.uid;
  }

  select(): Observable<any> {
    this.issuesCollection = this.afs.collection('issues', (ref) =>
      ref.where('userId', '==', this.getUserId()).orderBy('createDate', 'desc')
    );

    return this.issuesCollection.valueChanges();
  }

  create(issue: Issue): Observable<Issue> {
    let id = uuidv4();

    issue = {
      id: id,
      ...issue,
      userId: this.getUserId(),
      createDate: firebase.firestore.FieldValue.serverTimestamp(),
    };

    this.issuesCollection
      .doc(id)
      .set(issue)
      .then(() => {
        console.log('Create Issue Success');
      })
      .catch(() => {
        console.log('Create Issue Error');
      });

    return of(issue);
  }

  update(issue: Issue): Observable<Issue> {
    this.issuesCollection
      .doc(issue.id)
      .set(issue)
      .then(() => {
        console.log('Update Issue Success');
      })
      .catch(() => {
        console.log('Update Issue Error');
      });

    return of(issue);
  }

  delete(issue: Issue): Observable<Issue> {
    this.issuesCollection
      .doc(issue.id)
      .delete()
      .then(() => {
        console.log('Delete Issue Success');
      })
      .catch(() => {
        console.log('Delete Issue Error');
      });

    return of(issue);
  }
}

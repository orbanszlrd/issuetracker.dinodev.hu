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
  issuesCollection: AngularFirestoreCollection<Issue>;

  constructor(private afs: AngularFirestore) {
    this.issuesCollection = this.afs.collection('issues');
  }

  getUserId() {
    return firebase.auth().currentUser?.uid;
  }

  select(): Observable<Issue[]> {
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

    this.issuesCollection.doc(id).set(issue);

    return of(issue);
  }

  update(issue: Issue): Observable<Issue> {
    this.issuesCollection.doc(issue.id).set(issue);

    return of(issue);
  }

  delete(issue: Issue): Observable<Issue> {
    this.issuesCollection.doc(issue.id).delete();

    return of(issue);
  }
}

import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

import firebase from 'firebase/compat/app';
import { v4 as uuidv4 } from 'uuid';

import { Observable, of } from 'rxjs';

import { Board } from '../models/board.model';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  boardsCollection: AngularFirestoreCollection<any> | undefined;

  constructor(private afs: AngularFirestore) {}

  select(projectId: string): Observable<any> {
    this.boardsCollection = this.afs
      .collection('projects')
      .doc(projectId)
      .collection('boards');

    return this.boardsCollection.valueChanges();
  }

  create(board: Board): Observable<Board> {
    let id = uuidv4();

    board = {
      id: id,
      ...board,
      createDate: firebase.firestore.FieldValue.serverTimestamp(),
    };

    this.boardsCollection = this.afs
      .collection('projects')
      .doc(board.projectId)
      .collection('boards');

    this.boardsCollection
      .doc(id)
      .set(board)
      .then(() => {
        console.log('Create Board Success');
      })
      .catch(() => {
        console.log('Create Board Error');
      });

    return of(board);
  }

  update(board: Board): Observable<Board> {
    this.boardsCollection = this.afs
      .collection('projects')
      .doc(board.projectId)
      .collection('boards');

    this.boardsCollection
      .doc(board.id)
      .set(board)
      .then(() => {
        console.log('Create Board Success');
      })
      .catch(() => {
        console.log('Create Board Error');
      });

    return of(board);
  }

  delete(board: Board): Observable<any> {
    this.boardsCollection = this.afs
      .collection('projects')
      .doc(board.projectId)
      .collection('boards');

    this.boardsCollection
      .doc(board.id)
      .delete()
      .then(() => {
        console.log('Delete Board Success');
      })
      .catch(() => {
        console.log('Delete Board Error');
      });

    return of(board);
  }
}

import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';

import firebase from 'firebase/app';
import { v4 as uuidv4 } from 'uuid';

import { EMPTY, Observable, of } from 'rxjs';

import { Board } from '../../models/board.model';

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
        console.log('Create Success');
      })
      .catch(() => {
        console.log('Create Error');
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
        console.log('Delete Success');
      })
      .catch(() => {
        console.log('Delete Error');
      });

    return of(board);
  }
}

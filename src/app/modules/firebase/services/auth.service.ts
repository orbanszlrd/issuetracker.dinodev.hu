import { Injectable } from '@angular/core';

import { Router } from '@angular/router';

import firebase from 'firebase/compat/app';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User | null | undefined>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        return this.getUserData(user);
      })
    );
  }

  getUserData(user: firebase.User | null): Observable<User | undefined | null> {
    if (user) {
      return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
    } else {
      return of(null);
    }
  }

  private updateUserData({ uid, email, displayName, photoURL }: firebase.User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${uid}`
    );

    const data: User = {
      uid,
      email,
      displayName,
      photoURL,
    };

    return userRef.set(data, { merge: true });
  }

  async googleSignIn(): Promise<void> {
    const provider = new firebase.auth.GoogleAuthProvider();
    const userCredential = await this.afAuth.signInWithPopup(provider);

    if (userCredential && userCredential.user) {
      this.updateUserData(userCredential.user);
    }
  }

  async signOut(): Promise<void> {
    await this.afAuth.signOut();

    this.router.navigate(['/']);
  }
}

import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { FirebaseModule } from '../firebase.module';

import firebase from 'firebase/compat/app';

import { AuthService } from './auth.service';
import { User } from './user.model';
import { of } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;

  let afAuth: AngularFireAuth;
  let afs: AngularFirestore;

  const dummyUser: User = {
    uid: '000000000000000000',
    email: 'user@email.com',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FirebaseModule],
    });
    service = TestBed.inject(AuthService);

    afAuth = TestBed.inject(AngularFireAuth);
    afs = TestBed.inject(AngularFirestore);

    spyOn(afAuth, 'signInWithPopup').and.returnValue(
      new Promise<firebase.auth.UserCredential>((resolve, reject) => {
        resolve({
          additionalUserInfo: null,
          credential: {
            providerId: 'google.com',
            signInMethod: 'password',
            toJSON() {},
          },
          operationType: null,
          user: {
            displayName: 'User Name',
            email: 'user@email.com',
            photoURL: null,
            providerId: 'provider.com',
            uid: '000000000000000000000',
          },
        } as firebase.auth.UserCredential);
        reject();
      })
    );

    spyOn(afAuth, 'signOut').and.returnValue(
      new Promise<void>((resolve, reject) => {
        resolve();
        reject();
      })
    );

    spyOn(afs, 'doc').and.returnValue({
      set: (data) => {},
      valueChanges: () => of(dummyUser),
    } as AngularFirestoreDocument<User>);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an observable of null', (done) => {
    service.getUserData(null).subscribe((data) => {
      expect(data).toBeNull();
      done();
    });
  });

  it('should return an observable of User', (done) => {
    service.getUserData({} as firebase.User).subscribe((user) => {
      expect(user).toBeTruthy();
      expect(user?.uid).toBeDefined();
      expect(user?.email).toBeDefined();
      expect(user?.uid).toEqual(dummyUser.uid);
      expect(user?.email).toEqual(dummyUser.email);
      done();
    });
  });

  it('should sign in', fakeAsync(() => {
    service.googleSignIn();
    tick();
    expect(afAuth.signInWithPopup).toHaveBeenCalledTimes(1);
  }));

  it('should sign out', fakeAsync(() => {
    service.signOut();
    tick();
    expect(afAuth.signOut).toHaveBeenCalledTimes(1);
  }));
});

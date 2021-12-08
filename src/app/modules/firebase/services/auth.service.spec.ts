import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { FirebaseModule } from '../firebase.module';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  let afAuth: AngularFireAuth;
  let afs: AngularFirestore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FirebaseModule],
    });
    service = TestBed.inject(AuthService);

    afAuth = TestBed.inject(AngularFireAuth);
    afs = TestBed.inject(AngularFirestore);

    spyOn(afAuth, 'signInWithPopup');
    spyOn(afAuth, 'signOut');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should sign in', async () => {
    service.googleSignIn();

    expect(afAuth.signInWithPopup).toHaveBeenCalledTimes(1);
  });

  it('should sign out', async () => {
    service.signOut();

    expect(afAuth.signOut).toHaveBeenCalledTimes(1);
  });
});

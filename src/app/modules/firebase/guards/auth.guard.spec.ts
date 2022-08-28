import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FirebaseModule } from '../firebase.module';

import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';

function fakeRouterState(url: string): RouterStateSnapshot {
  return {
    url,
  } as RouterStateSnapshot;
}

describe('AuthGuard', () => {
  let auth: AuthService;
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FirebaseModule],
    });

    auth = TestBed.inject(AuthService);

    guard = new AuthGuard(auth);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should deny unauthorized users', (done) => {
    const dummyRoute = {} as ActivatedRouteSnapshot;
    const fakeUrl = '/issueTracker';

    auth.user$ = of(null);

    let canActivate = guard.canActivate(
      dummyRoute,
      fakeRouterState(fakeUrl)
    ) as Observable<Boolean>;

    canActivate.subscribe((authorized) => {
      expect(authorized).toBeFalse();
      done();
    });
  });

  it('should allow authorized users', (done) => {
    const dummyRoute = {} as ActivatedRouteSnapshot;
    const fakeUrl = '/issueTracker';

    auth.user$ = of({ uid: 'uid', email: 'user@email.com' } as User);

    let canActivate = guard.canActivate(
      dummyRoute,
      fakeRouterState(fakeUrl)
    ) as Observable<Boolean>;

    canActivate.subscribe((authorized) => {
      expect(authorized).toBeTrue();
      done();
    });
  });
});

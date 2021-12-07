import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FirebaseModule } from '../firebase.module';

import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { map, Observable, of, take } from 'rxjs';
import { User } from './user.model';

function fakeRouterState(url: string): RouterStateSnapshot {
  return {
    url,
  } as RouterStateSnapshot;
}

describe('AuthGuard', () => {
  let router: Router;
  let auth: AuthService;
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FirebaseModule],
    });

    auth = TestBed.inject(AuthService);
    router = TestBed.inject(Router);

    guard = new AuthGuard(auth, router);
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

import { TestBed } from '@angular/core/testing';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';

import firebase from 'firebase/compat/app';

import { Issue } from '../models/issue.model';
import { IssueService } from './issue.service';

describe('IssueService', () => {
  let service: IssueService;

  const afsSpy = jasmine.createSpyObj('AngularFirestore', ['collection']);

  beforeEach(() => {
    TestBed.configureTestingModule({});

    afsSpy.collection.and.returnValue({
      valueChanges: () => of({}),
      doc: (id: string) => {
        return {
          set: (issue: Issue) =>
            new Promise((resolve, reject) => {
              resolve();
            }),
          delete: () =>
            new Promise((resolve, reject) => {
              resolve();
            }),
        };
      },
    } as AngularFirestoreCollection);

    service = new IssueService(afsSpy);

    spyOn(firebase, 'auth').and.returnValue(<firebase.auth.Auth>{
      currentUser: <firebase.User>{ uid: '0000000000000000' },
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should select the collection of issues', () => {
    let collection = service.select();
    expect(collection).toBeDefined();
  });

  it('should created a new issue', (done) => {
    let issue: Issue = {
      title: 'Issue 1',
      slug: 'issue-1',
      description: '',
    };

    let result = service.create(issue);

    expect(result).toBeInstanceOf(Observable);

    result.subscribe((data) => {
      expect(data.title).toEqual(issue.title);
      done();
    });
  });

  it('should update an existing issue', (done) => {
    let issue: Issue = {
      id: '1',
      title: 'Issue 1',
      slug: 'issue-1',
      description: '',
    };

    let result = service.update(issue);

    expect(result).toBeInstanceOf(Observable);

    result.subscribe((data) => {
      expect(data.title).toEqual(issue.title);
      done();
    });
  });

  it('should delete an existing issue', (done) => {
    let issue: Issue = {
      id: '1',
      title: 'Issue 1',
      slug: 'issue-1',
      description: '',
    };

    let result = service.delete(issue);

    expect(result).toBeInstanceOf(Observable);

    result.subscribe((data) => {
      expect(data.title).toEqual(issue.title);
      done();
    });
  });
});

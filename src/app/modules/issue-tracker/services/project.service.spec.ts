import { TestBed } from '@angular/core/testing';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';

import firebase from 'firebase/compat/app';

import { Project } from '../models/project.model';
import { ProjectService } from './project.service';

describe('ProjectService', () => {
  let service: ProjectService;

  const afsSpy = jasmine.createSpyObj('AngularFirestore', ['collection']);

  const dummyPromise: Promise<void> = new Promise((resolve, _reject) => {
    resolve();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    afsSpy.collection.and.returnValue({
      valueChanges: () => of({}),
      doc: (_id: string) => {
        return {
          set: (_project: Project) => dummyPromise,
          delete: () => dummyPromise,
        };
      },
    } as AngularFirestoreCollection);

    service = new ProjectService(afsSpy);

    spyOn(firebase, 'auth').and.returnValue(<firebase.auth.Auth>{
      currentUser: <firebase.User>{ uid: '0000000000000000' },
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the userId', () => {
    let userId = service.getUserId();
    expect(userId).toBeDefined();
  });

  it('should select the collection of projects', () => {
    let collection = service.select();
    expect(collection).toBeDefined();
  });

  it('should created a new project', (done) => {
    let project: Project = {
      title: 'Project 1',
      slug: 'project-1',
      description: '',
    };

    let result = service.create(project);

    expect(result).toBeInstanceOf(Observable);

    result.subscribe((data) => {
      expect(data.title).toEqual(project.title);
      done();
    });
  });

  it('should update an existing project', (done) => {
    let project: Project = {
      id: '1',
      title: 'Project 1',
      slug: 'project-1',
      description: '',
    };

    let result = service.update(project);

    expect(result).toBeInstanceOf(Observable);

    result.subscribe((data) => {
      expect(data.title).toEqual(project.title);
      done();
    });
  });

  it('should delete an existing project', (done) => {
    let project: Project = {
      id: '1',
      title: 'Project 1',
      slug: 'project-1',
      description: '',
    };

    let result = service.delete(project);

    expect(result).toBeInstanceOf(Observable);

    result.subscribe((data) => {
      expect(data.title).toEqual(project.title);
      done();
    });
  });
});

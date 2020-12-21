import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as AppActions from '../../../../store/actions/app.actions';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  isLoading$: Observable<boolean>;

  constructor(private store: Store<{ isLoading: boolean }>) {
    this.isLoading$ = this.store.select((state: any) => state.app.isLoading);
  }

  loaded(): void {
    this.store.dispatch(AppActions.setIsLoading({ isLoading: false }));
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loaded();
    }, 1000);
  }
}

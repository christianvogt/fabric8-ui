import { Injectable } from '@angular/core';
import { configure, observable } from 'mobx';
import { AppState } from './AppState';

configure({
  enforceActions: true,
  isolateGlobalState: true
});

@Injectable()
export class Store {
  readonly state: AppState;

  constructor() {
    this.state = observable.object({}) as AppState;
  }
}

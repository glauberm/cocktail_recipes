import {
  convertToParamMap, ParamMap, Params
} from '@angular/router';
import { ReplaySubject } from 'rxjs';

export class ActivatedRouteStub {
  private subject = new ReplaySubject<ParamMap>();
  public snapshot;

  constructor(initialParams?: Params) {
    this.setParamMap(initialParams);
  }

  readonly paramMap = this.subject.asObservable();
  readonly 
  
  public setParamMap(params?: Params) {
    this.subject.next(convertToParamMap(params));
    this.snapshot = { paramMap: (convertToParamMap(params)) };
  };
}
import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {
  private data;
  private $data = new Subject();

  constructor() {
  }

  setData(data: any) {
    this.data = data;
    this.$data.next(data);
  }

  getDataAsObservarble(): Observable<any> {
    return this.$data;
  }

  clearData() {
    this.data = undefined;
  }

  getData() {
    const tmp = this.data;
    this.clearData();
    return tmp;
  }
}

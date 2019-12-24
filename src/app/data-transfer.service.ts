import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {
  private data;

  constructor() {
  }

  setData(data: any) {
    this.data = data;
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

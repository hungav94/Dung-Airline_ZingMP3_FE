import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {
  private data;
  private dataSong;
  private $data = new Subject();
  private dataSongPlaylist;

  constructor() {
  }

  setDataSong(data: any) {
    this.dataSong = data;
  }

  setData(data: any) {
    this.data = data;
    this.$data.next(data);
  }

  setDataSongPlaylist(data: any) {
    this.dataSongPlaylist = data;
  }

  getDataAsObservarble(): Observable<any> {
    return this.$data;
  }

  getDataSong() {
    return this.dataSong;
  }

  getDataSongPlaylist() {
    return this.dataSongPlaylist;
  }

  getDataPlaylist() {
    return this.data;
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

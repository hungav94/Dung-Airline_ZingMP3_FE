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

  setDataPlaylist(data: any) {
    const tmp = this.data;
    return tmp;
  }

  getDataPlaylist() {
    const tmp = this.data;
    // this.data = undefined;
    return tmp;
  }

  clearData() {
    this.data = undefined;
  }

  getData() {
    const tmp = this.data;
    return tmp;
  }
}

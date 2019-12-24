import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Song} from './Song';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  private songList: Song[];
  private url = 'http://localhost:8080/api/song';

  constructor(private http: HttpClient) {
  }

  setSongList(songs: Song[]) {
    this.songList = songs;
  }

  getCurrentSongList() {
    return this.songList;
  }

  getSongList(): Observable<Song[]> {
    return this.http.get<Song[]>(this.url);
  }

  deleteSong(song: Song) {
    return this.http.delete(this.url + '/' + song.id);
  }

  addSong(song: Song) {
    song.id = this.songList[this.songList.length - 1].id + 1;
    return this.http.post(this.url, song);
  }

  editSong(song: Song) {
    return this.http.put(this.url + '/' + song.id, song);
  }
}

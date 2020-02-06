import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Song} from './Song';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  private url = 'http://localhost:8083/api/song';
  private urlLike = 'http://localhost:8083/api/likes';

  constructor(private http: HttpClient) {
  }

  getLikesBySong(song: Song): Observable<any> {
    return this.http.get(this.urlLike + '/' + song.id);
  }

  addLike(formData: FormData): Observable<any> {
    return this.http.post<any>(this.urlLike, formData);
  }

  deleteLike(id: number): Observable<any> {
    return this.http.delete(this.urlLike + '/' + id);
  }

  getSongById(id: number): Observable<Song> {
    return this.http.get<Song>(this.url + '/' + id);
  }

  getSongList(): Observable<Song[]> {
    return this.http.get<Song[]>(this.url);
  }

  getSongListOrderByIdDesc(): Observable<Song[]> {
    return this.http.get<Song[]>(this.url + '-sort-desc');
  }

  getSongListOrderByLikeSongDesc(): Observable<Song[]> {
    return this.http.get<Song[]>(this.url + '-like-desc');
  }

  getSongListOrderByListenSongDesc(): Observable<Song[]> {
    return this.http.get<Song[]>(this.url + '-listen-desc');
  }

  deleteSong(song: Song) {
    return this.http.delete(this.url + '/' + song.id);
  }

  addSong(formData: FormData): Observable<any> {
    return this.http.post(this.url, formData);
  }

  editSong(formData: FormData): Observable<any> {
    return this.http.put(this.url, formData);
  }

  updateSongView(formData: FormData): Observable<any> {
    return this.http.put(this.url + '-view', formData);
  }

  updateSongLike(formData: FormData): Observable<any> {
    return this.http.put(this.url + '-like', formData);
  }

  searchSongByName(nameSong: string): Observable<Song[]> {
    return this.http.get<Song[]>(this.url + '-search/' + nameSong);
  }
}

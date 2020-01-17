import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Playlist} from './Playlist';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  private url = 'http://localhost:8083/api/playlist';

  constructor(private http: HttpClient) {
  }

  getPlaylist(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(this.url);
  }

  getPlaylistById(id: number): Observable<Playlist> {
    return this.http.get<Playlist>(this.url + '/' + id);
  }

  addPlaylist(formData: FormData): Observable<any> {
    return this.http.post(this.url, formData);
  }

  editPlaylist(formData: FormData): Observable<any> {
    return this.http.put(this.url, formData);
  }

}

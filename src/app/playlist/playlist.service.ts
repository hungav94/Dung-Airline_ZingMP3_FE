import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  private url = 'http://localhost:8083/api/playlist';

  constructor(private http: HttpClient) {
  }
}

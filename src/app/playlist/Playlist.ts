import {Song} from '../song/Song';

export interface Playlist {
  id: number;
  playlistName: string;
  playlistDescription: string;
  avatarPlaylist: string;
  songs: Song[];
}

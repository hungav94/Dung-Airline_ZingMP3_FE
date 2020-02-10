import {User} from './auth/User';
import {Playlist} from './playlist/Playlist';

export interface LikePlaylist {
  id: number;
  playlist: Playlist;
  user: User;
}

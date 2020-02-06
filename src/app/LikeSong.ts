import {Song} from './song/Song';
import {User} from './auth/User';

export interface LikeSong {
  id: number;
  song: Song;
  user: User;
}

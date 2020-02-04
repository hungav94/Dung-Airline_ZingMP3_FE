import {Song} from './song/Song';
import {User} from './auth/User';

export interface Like {
  id: number;
  song: Song;
  user: User;
}

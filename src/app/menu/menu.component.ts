import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SongService} from '../song/song.service';
import {DataTransferService} from '../data-transfer.service';
import {TokenStorageService} from '../auth/token-storage.service';
import {PlaylistService} from '../playlist/playlist.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  private roles: string[];
  private authority: string;
  private userName: string;

  constructor(private router: Router,
              private songService: SongService,
              private dataTransfer: DataTransferService,
              private tokenStorage: TokenStorageService,
              private playlistService: PlaylistService) {
  }

  ngOnInit() {
    this.userName = 'Đăng nhập';
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      this.userName = this.tokenStorage.getUsername();
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        } else if (role === 'ROLE_PM') {
          this.authority = 'pm';
          return false;
        }
        this.authority = 'user';
        return true;
      });
    }
  }

  Search(event) {
    const search = event.target.value;
    if (search === '') {
      this.songService.getSongList().subscribe(result => {
        const song = result;
        this.dataTransfer.setData(song);
      });
    } else {
      this.songService.searchSongByName(search).subscribe(result => {
        const song = result;
        this.dataTransfer.setData(song);
        // this.router.navigateByUrl('/song/songList');
      });
    }
  }

  Logout() {
    this.tokenStorage.signOut();
  }

  // SearchPlayList(event) {
  //   const searchPlaylist = event.target.value;
  //   if (searchPlaylist === '') {
  //     this.playlistService.getPlaylist().subscribe(result => {
  //       const playlists = result;
  //       this.dataTransfer.setData(playlists);
  //     });
  //   } else {
  //     this.playlistService.searchByNamePlaylist(searchPlaylist).subscribe(result => {
  //       const playlists = result;
  //       this.dataTransfer.setData(playlists);
  //       // this.router.navigateByUrl('/playlist');
  //     });
  //   }
  // }
}

import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SongService} from '../song/song.service';
import {DataTransferService} from '../data-transfer.service';
import {TokenStorageService} from '../auth/token-storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  private roles: string[];
  private authority: string;

  constructor(private router: Router,
              private songService: SongService,
              private dataTransfer: DataTransferService,
              private tokenStorage: TokenStorageService) {
  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
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
    console.log(search);
    if (search === '') {
      this.songService.getSongList().subscribe(result => {
        const song = result;
        this.dataTransfer.setData(song);
      });
    } else {
      this.songService.searchSongByName(search).subscribe(result => {
        const song = result;
        this.dataTransfer.setData(song);
        this.router.navigateByUrl('/songList');
      });
}
  }

}

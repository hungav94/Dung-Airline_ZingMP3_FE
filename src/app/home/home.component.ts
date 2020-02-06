import {Component, OnInit} from '@angular/core';
import {SongService} from '../song/song.service';
import {Song} from '../song/Song';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  songIdDesc: Song[];
  songLikeDesc: Song[];
  songListenDesc: Song[];
  p = 1;
  count = 3;

  constructor(private songService: SongService,
              private route: Router) {
  }

  ngOnInit() {
    this.loadSongIdDesc();
    this.loadLikeSongDesc();
    this.loadListenSongDesc();
  }

  loadSongIdDesc() {
    this.songService.getSongListOrderByIdDesc().subscribe(data => {
      this.songIdDesc = data;
    });
  }

  loadLikeSongDesc() {
    this.songService.getSongListOrderByLikeSongDesc().subscribe(data => {
      this.songLikeDesc = data;
    });
  }

  loadListenSongDesc() {
    this.songService.getSongListOrderByListenSongDesc().subscribe(data => {
      this.songListenDesc = data;
    });
  }

  goToDetailSong(id: number) {
    this.route.navigateByUrl('song/detail-song/' + id);
  }
}

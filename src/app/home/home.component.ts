import {Component, OnInit} from '@angular/core';
import {SongService} from '../song/song.service';
import {Song} from '../song/Song';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  songListDesc: Song[];
  p = 1;
  count = 3;

  constructor(private songService: SongService) {
  }

  ngOnInit() {
    this.loadSongDesc();
  }

  loadSongDesc() {
    this.songService.getSongListOrderByIdDesc().subscribe(data => {
      this.songListDesc = data;
    });
  }

}

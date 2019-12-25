import {Component, OnInit} from '@angular/core';
import {Song} from '../Song';
import {Router} from '@angular/router';
import {SongService} from '../song.service';
import {DataTransferService} from '../../data-transfer.service';

@Component({
  selector: 'app-list-song',
  templateUrl: './list-song.component.html',
  styleUrls: ['./list-song.component.scss']
})
export class ListSongComponent implements OnInit {

  songList: Song[];

  constructor(private router: Router,
              private songService: SongService,
              private dataTransferService: DataTransferService) {
  }

  ngOnInit() {
    this.songService.getSongList().subscribe(data => {
      this.songService.setSongList(data);
      this.refreshSongList();
    });
  }

  refreshSongList() {
    this.songList = this.songService.getCurrentSongList();
  }

  deleteSong(item: Song) {
    if (confirm('Are You Sure You delete this Song?')) {
      this.songService.deleteSong(item).subscribe(re => {
        this.router.navigateByUrl('/songList');
      });
    }
  }

  editSong() {

  }
}

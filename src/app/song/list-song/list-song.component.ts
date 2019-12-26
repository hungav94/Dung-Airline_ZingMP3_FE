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
    this.refreshSongList();
  }

  ngOnInit() {
    this.songService.getSongList().subscribe(data => {
      this.refreshSongList();
    });
  }

  refreshSongList() {
    this.songService.getSongList().subscribe(result => {
      this.songList = result;
    });
  }

  deleteSong(item: Song) {
    if (confirm('Are You Sure You delete this Song?')) {
      this.songService.deleteSong(item).subscribe(re => {
        this.router.navigateByUrl('/songList');
        this.refreshSongList();
      });
    }
  }

  editSong(item: Song) {
    this.dataTransferService.setData(item);
    this.router.navigateByUrl('/editSong');
  }
}

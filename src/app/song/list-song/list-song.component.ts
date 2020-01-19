import {Component, OnInit} from '@angular/core';
import {Song} from '../Song';
import {Router} from '@angular/router';
import {SongService} from '../song.service';
import {DataTransferService} from '../../data-transfer.service';
import {Observable} from 'rxjs';
import {Track} from 'ngx-audio-player';

@Component({
  selector: 'app-list-song',
  templateUrl: './list-song.component.html',
  styleUrls: ['./list-song.component.scss']
})
export class ListSongComponent implements OnInit {

  constructor(private router: Router,
              private songService: SongService,
              private dataTransferService: DataTransferService) {
    this.searchSong();
  }

  songList: Song[];
  $searchName: Observable<any>;
  song: Song;

  ngOnInit() {
    for (const item of this.songList) {
      this.song.listenSong = localStorage.getItem('' + item.id);
    }
    this.searchSong();
    this.$searchName = this.dataTransferService.getDataAsObservarble();
    console.log(this.$searchName);
    this.$searchName.subscribe(songList => {
      // console.log(songList);
      this.songList = songList;
    });
    // this.refreshSongList();
  }

  searchSong() {
    const tmp = this.dataTransferService.getData();
    if (tmp === undefined) {
      this.refreshSongList();
    } else {
      this.songList = tmp;
    }
  }

  refreshSongList() {
    this.songService.getSongList().subscribe(result => {
      this.songList = result;
    });
  }

  deleteSong(item: Song) {
    if (confirm('Are You Sure You delete this Song?')) {
      this.songService.deleteSong(item).subscribe(re => {
        this.router.navigateByUrl('/song/songList');
        this.refreshSongList();
      });
    }
  }

  editSong(item: Song) {
    this.dataTransferService.setData(item);
    this.router.navigateByUrl('/song/editSong');
  }

  playMp3(event, song: Song) {
    let count = 0;
    if (localStorage.getItem('' + song.id) === undefined) {
      event.target.play();
      count++;
      localStorage.setItem('' + song.id, '' + count);
      console.log(localStorage.getItem('' + song.id));
    } else {
      event.target.play();
      count = Number(localStorage.getItem('' + song.id));
      count++;
      localStorage.setItem('' + song.id, '' + count);
      console.log(localStorage.getItem('' + song.id));
    }

  }
}

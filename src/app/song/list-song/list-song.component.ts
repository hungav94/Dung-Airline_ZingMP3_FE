import {Component, OnInit} from '@angular/core';
import {Song} from '../Song';
import {Router} from '@angular/router';
import {SongService} from '../song.service';
import {DataTransferService} from '../../data-transfer.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-list-song',
  templateUrl: './list-song.component.html',
  styleUrls: ['./list-song.component.scss']
})
export class ListSongComponent implements OnInit {

  songList: Song[];
  $searchName: Observable<any>;
  song: Song;

  constructor(private router: Router,
              private songService: SongService,
              private dataTransferService: DataTransferService) {
    this.searchSong();
  }

  ngOnInit() {
    this.searchSong();
    this.$searchName = this.dataTransferService.getDataAsObservarble();
    // console.log(this.$searchName);
    console.log(this.$searchName.subscribe(songList => {
      this.songList = songList;
    }));
    this.$searchName.subscribe(songList => {
      this.songList = songList;
    });
    // this.refreshSongList();
    // for (const item of this.songList) {
    //   console.log(1);
    //   this.song.listenSong = localStorage.getItem('' + item.id);
    //   console.log(this.song.listenSong);
    // }
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

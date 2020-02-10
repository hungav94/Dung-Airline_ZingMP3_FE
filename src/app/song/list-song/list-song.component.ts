import {Song} from '../Song';
import {SongService} from '../song.service';
import {DataTransferService} from '../../data-transfer.service';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-list-song',
  templateUrl: './list-song.component.html',
  styleUrls: ['./list-song.component.scss']
})
export class ListSongComponent implements OnInit {

  songList: Song[] = [];
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
    console.log(this.$searchName.subscribe(songList => {
      this.songList = songList;
    }));
    this.$searchName.subscribe(songList => {
      this.songList = songList;
    });

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


  // playMp3(event, song: Song) {
  //   let count = 0;
  //   if (localStorage.getItem('' + song.id) === undefined) {
  //     event.target.play();
  //     count++;
  //     localStorage.setItem('' + song.id, '' + count);
  //     console.log(localStorage.getItem('' + song.id));
  //   } else {
  //     event.target.play();
  //     count = Number(localStorage.getItem('' + song.id));
  //     count++;
  //     localStorage.setItem('' + song.id, '' + count);
  //     console.log(localStorage.getItem('' + song.id));
  //   }
  // }

  goToSongDetail(id: number) {
    this.songService.getSongById(id).subscribe(result => {
      // this.song = result;
      // this.dataTransferService.setData(this.song);
      this.router.navigateByUrl('/song/detail-song/' + id);
    });
  }
}

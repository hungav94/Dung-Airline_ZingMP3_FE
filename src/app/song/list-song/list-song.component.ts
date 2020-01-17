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

  constructor(private router: Router,
              private songService: SongService,
              private dataTransferService: DataTransferService) {
    this.searchSong();
  }

  ngOnInit() {
    console.log(1);
    this.searchSong();
    this.$searchName = this.dataTransferService.getDataAsObservarble();
    this.$searchName.subscribe(songList => {
      this.songList = songList;
      console.log(this.songList);
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

  goToViewSong(id: number) {

  }
}

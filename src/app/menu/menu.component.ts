import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SongService} from '../song/song.service';
import {DataTransferService} from '../data-transfer.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router,
              private songService: SongService,
              private dataTransfer: DataTransferService) {
  }

  ngOnInit() {
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

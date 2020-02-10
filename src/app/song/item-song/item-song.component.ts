import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Song} from '../Song';
import {DataTransferService} from '../../data-transfer.service';
import {Router} from '@angular/router';
import {SongService} from '../song.service';


@Component({
  selector: 'app-item-song',
  templateUrl: './item-song.component.html',
  styleUrls: ['./item-song.component.scss']
})
export class ItemSongComponent implements OnInit {

  @Input() song;
  @Output() viewClicked = new EventEmitter();

  constructor(private dataTransfer: DataTransferService,
              private route: Router,
              private songService: SongService) {
  }

  ngOnInit() {
  }

  emitView() {
    this.viewClicked.emit();
  }

  editSong(item: Song) {
    this.dataTransfer.setData(item);
    this.route.navigateByUrl('/song/editSong/' + item.id);
  }

  deleteSong(item: Song) {
    if (confirm('Are You Sure You delete this Song?')) {
      this.songService.deleteSong(item).subscribe(re => {
        this.route.navigateByUrl('/song/songList');
        window.location.reload();
      });
    }
  }
}

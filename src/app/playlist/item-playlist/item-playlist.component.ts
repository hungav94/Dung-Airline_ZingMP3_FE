import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Playlist} from '../Playlist';

@Component({
  selector: 'app-item-playlist',
  templateUrl: './item-playlist.component.html',
  styleUrls: ['./item-playlist.component.scss']
})
export class ItemPlaylistComponent implements OnInit {

  @Input() playlist;
  @Output() viewClicked = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    console.log(this.playlist.songs);
  }

  emitView() {
    this.viewClicked.emit();
  }

}

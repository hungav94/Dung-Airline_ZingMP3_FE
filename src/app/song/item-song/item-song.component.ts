import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-item-song',
  templateUrl: './item-song.component.html',
  styleUrls: ['./item-song.component.scss']
})
export class ItemSongComponent implements OnInit {

  @Input() song;
  @Output() viewClicked = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  emitView() {
    this.viewClicked.emit();
  }

}

import {Component, OnInit} from '@angular/core';
import {Playlist} from '../Playlist';
import {PlaylistService} from '../playlist.service';
import {Router} from '@angular/router';
import {DataTransferService} from '../../data-transfer.service';

@Component({
  selector: 'app-detail-playlist',
  templateUrl: './detail-playlist.component.html',
  styleUrls: ['./detail-playlist.component.scss']
})
export class DetailPlaylistComponent implements OnInit {

  playlist: Playlist;

  constructor(private playlistService: PlaylistService,
              private route: Router,
              private dataTransfer: DataTransferService) {
  }

  ngOnInit() {
    this.playlist = this.dataTransfer.getData();
  }

}

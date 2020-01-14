import {Component, OnInit} from '@angular/core';
import {Playlist} from '../Playlist';
import {PlaylistService} from '../playlist.service';
import {Router} from '@angular/router';
import {DataTransferService} from '../../data-transfer.service';
import {SongService} from '../../song/song.service';
import {Song} from '../../song/Song';

@Component({
  selector: 'app-detail-playlist',
  templateUrl: './detail-playlist.component.html',
  styleUrls: ['./detail-playlist.component.scss']
})
export class DetailPlaylistComponent implements OnInit {

  playlist: Playlist;
  songList: Song[];

  constructor(private playlistService: PlaylistService,
              private songService: SongService,
              private route: Router,
              private dataTransfer: DataTransferService) {
  }

  ngOnInit() {
    this.loadSongList();
    this.playlist = this.dataTransfer.getDataPlaylist();
  }

  loadSongList() {
    this.songService.getSongList().subscribe(data => {
      this.songList = data;
    });
  }

}

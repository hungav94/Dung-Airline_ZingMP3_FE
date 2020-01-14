import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Playlist} from '../Playlist';
import {Song} from '../../song/Song';
import {PlaylistService} from '../playlist.service';
import {SongService} from '../../song/song.service';
import {Router} from '@angular/router';
import {DataTransferService} from '../../data-transfer.service';

@Component({
  selector: 'app-song-playlist',
  templateUrl: './song-playlist.component.html',
  styleUrls: ['./song-playlist.component.scss']
})
export class SongPlaylistComponent implements OnInit {

  @Input() playlist: Playlist;
  playlistData: Playlist;
  songList = [];

  constructor(private playlistService: PlaylistService,
              private songService: SongService,
              private route: Router,
              private dataTransfer: DataTransferService) {
  }

  ngOnInit() {
    // this.playlist = this.dataTransfer.getData();
    this.playlistData = this.dataTransfer.getDataSongPlaylist();
  }

  deleteSongToPlaylist(index: number) {
    console.log(this.playlist.songs);
    this.songList.push(this.playlist.songs[index]);
    this.dataTransfer.setDataSongPlaylist(this.songList);
    this.playlist.songs.splice(index, 1);
  }
}

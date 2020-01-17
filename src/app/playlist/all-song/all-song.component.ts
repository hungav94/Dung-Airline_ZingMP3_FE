import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Song} from '../../song/Song';
import {PlaylistService} from '../playlist.service';
import {SongService} from '../../song/song.service';
import {Router} from '@angular/router';
import {DataTransferService} from '../../data-transfer.service';
import {Playlist} from '../Playlist';

@Component({
  selector: 'app-all-song',
  templateUrl: './all-song.component.html',
  styleUrls: ['./all-song.component.scss']
})
export class AllSongComponent implements OnInit {

  songList: Song[];
  playlist: Playlist;

  constructor(private playlistService: PlaylistService,
              private songService: SongService,
              private route: Router,
              private dataTransfer: DataTransferService) {
  }

  ngOnInit() {
    this.playlist = this.dataTransfer.getDataPlaylist();
    if (this.playlist.songs !== undefined) {
      this.songList = this.dataTransfer.getDataSong();
      console.log(this.songList.length);
      this.spliceSongs(this.playlist, this.songList);
    }
  }

  spliceSongs(playlist: Playlist, songList: Song[]) {
    for (let i = 0; i < songList.length; i++) {
      for (let j = 0; j < playlist.songs.length; j++) {
        if (songList[i].name === playlist.songs[j].name) {
          this.songList.splice(i, 1);
        }
      }
    }
  }

  loadSongList() {
    this.songService.getSongList().subscribe(data => {
      this.songList = data;
      // console.log(this.songList.length);
    });
  }

  addSongToPlaylist(index: number) {
    // this.playlist.songs.push(this.songList[index]);
    this.dataTransfer.setDataSongPlaylist(this.playlist);
    console.log(index);
    console.log(this.songList[index]);
    this.songList.splice(index, 1);
  }

}

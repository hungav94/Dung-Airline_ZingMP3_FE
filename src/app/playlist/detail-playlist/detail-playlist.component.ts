import {Component, OnInit} from '@angular/core';
import {Playlist} from '../Playlist';
import {PlaylistService} from '../playlist.service';
import {Router} from '@angular/router';
import {DataTransferService} from '../../data-transfer.service';
import {SongService} from '../../song/song.service';
import {Song} from '../../song/Song';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-detail-playlist',
  templateUrl: './detail-playlist.component.html',
  styleUrls: ['./detail-playlist.component.scss']
})
export class DetailPlaylistComponent implements OnInit {

  playlist: Playlist;
  songList: Song[];
  songToPlaylist: Song;
  formData = new FormData();
  avatar: any = File;
  fileMp3: any = File;
  playlistForm: FormGroup;

  constructor(private playlistService: PlaylistService,
              private fb: FormBuilder,
              private songService: SongService,
              private route: Router,
              private dataTransfer: DataTransferService) {
  }

  ngOnInit() {
    // this.loadSongList();
    // this.playlist = this.dataTransfer.getDataPlaylist();
    this.playlist = this.dataTransfer.getDataPlaylist();
    if (this.playlist.songs !== undefined) {
      this.songList = this.dataTransfer.getDataSong();
      console.log(this.songList.length);
      this.spliceSongs(this.playlist, this.songList);
    }
    this.playlistForm = this.fb.group({
      id: [this.playlist.id],
      playlistName: [this.playlist.playlistName],
      playlistDescription: [this.playlist.playlistDescription],
      avatarPlaylist: [this.playlist.avatarPlaylist]
    });
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

  addSongToPlaylist(index: number) {
    // this.playlist.songs.push(this.songList[index]);
    // this.dataTransfer.setDataSongPlaylist(this.playlist);
    console.log(index);
    console.log(this.songList[index]);
    this.songToPlaylist = this.songList[index];
    this.songList.splice(index, 1);
    this.playlist.songs.push(this.songToPlaylist);
  }

  loadSongList() {
    this.songService.getSongList().subscribe(data => {
      this.songList = data;
    });
  }

  deleteSongToPlaylist(index: number) {
    console.log(this.playlist.songs);
    // this.songList.push(this.playlist.songs[index]);
    this.songToPlaylist = this.playlist.songs[index];
    this.songList.push(this.songToPlaylist);
    this.dataTransfer.setDataSongPlaylist(this.songList);
    this.playlist.songs.splice(index, 1);
  }

  onSubmit() {
    const playlistForm = this.playlistForm.value;
    this.formData.append('playlist', JSON.stringify(playlistForm));
    this.playlistService.editPlaylist(this.formData).subscribe(result => {
      this.playlist = result;
    });
  }

  onChangeBox(id: number, event) {
    const songFormArray = this.playlistForm.controls.songs as FormArray;
    console.log(new FormControl(id));
    if (event.target.checked) {
      songFormArray.push(new FormControl(id));
    } else {
      const index = songFormArray.controls.findIndex(x => x.value === id);
      songFormArray.removeAt(index);
    }
  }

  checkSongs(c: AbstractControl) {
    const v = c.value;
    return (v.songList.length !== 0) ? null : {
      emptySong: true
    };
  }

}

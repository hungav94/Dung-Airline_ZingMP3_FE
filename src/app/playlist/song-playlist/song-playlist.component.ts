import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Playlist} from '../Playlist';
import {Song} from '../../song/Song';
import {PlaylistService} from '../playlist.service';
import {SongService} from '../../song/song.service';
import {Router} from '@angular/router';
import {DataTransferService} from '../../data-transfer.service';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-song-playlist',
  templateUrl: './song-playlist.component.html',
  styleUrls: ['./song-playlist.component.scss']
})
export class SongPlaylistComponent implements OnInit {

  @Input() playlist: Playlist;
  playlistData: Playlist;
  songList = [];
  playlistForm: FormGroup;
  selectedValue = null;
  formData = new FormData();
  avatar: any = File;
  fileMp3: any = File;

  constructor(private playlistService: PlaylistService,
              private fb: FormBuilder,
              private songService: SongService,
              private route: Router,
              private dataTransfer: DataTransferService) {
  }

  ngOnInit() {
    // this.playlist = this.dataTransfer.getData();
    this.playlistData = this.dataTransfer.getDataSongPlaylist();
    this.playlistForm = this.fb.group({
      id: [this.playlist.id],
      playlistName: [this.playlist.playlistName],
      playlistDescription: [this.playlist.playlistDescription],
      avatarPlaylist: [this.playlist.avatarPlaylist]
    });
  }

  deleteSongToPlaylist(index: number) {
    console.log(this.playlist.songs);
    this.songList.push(this.playlist.songs[index]);
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

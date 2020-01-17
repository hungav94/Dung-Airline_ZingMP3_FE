import {Component, OnInit} from '@angular/core';
import {Playlist} from '../Playlist';
import {PlaylistService} from '../playlist.service';
import {Router} from '@angular/router';
import {DataTransferService} from '../../data-transfer.service';
import {SongService} from '../../song/song.service';
import {Song} from '../../song/Song';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {findIndex} from 'rxjs/operators';

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
  isAddSongToPlaylist = false;

  constructor(private router: Router,
              private playlistService: PlaylistService,
              private fb: FormBuilder,
              private songService: SongService,
              private route: Router,
              private dataTransfer: DataTransferService) {
  }

  ngOnInit() {
    // this.loadSongList();
    this.playlist = this.dataTransfer.getDataPlaylist();
    this.songList = this.dataTransfer.getDataSong();
    // console.log(this.songList);
    console.log(this.playlist);
    if (this.playlist.songs.length !== 0) {
      this.spliceSongs(this.playlist, this.songList);
    }
    this.playlistForm = this.fb.group({
      id: [this.playlist.id],
      playlistName: [this.playlist.playlistName],
      playlistDescription: [this.playlist.playlistDescription],
      songs: this.fb.array([]),
    });
  }

  spliceSongs(playlist: Playlist, songList: Song[]) {
    for (const item of playlist.songs) {
      for (const item1 of songList) {
        if (item.id === item1.id) {
          const index = this.songList.findIndex(x => x === item1);
          this.songList.splice(index, 1);
        }
      }
    }
  }

  addSongToPlaylist(song: Song) {
    this.isAddSongToPlaylist = true;
    console.log(song);
    this.playlist.songs.push(song);
    const index = this.songList.findIndex(x => x === song);
    this.songList.splice(index, 1);
  }

  loadSongList() {
    this.songService.getSongList().subscribe(data => {
      this.songList = data;
    });
  }

  deleteSongToPlaylist(song: Song) {
    this.isAddSongToPlaylist = false;
    this.songList.push(song);
    const index = this.playlist.songs.findIndex(x => x === song);
    this.playlist.songs.splice(index, 1);
  }

  onSubmit() {
    const playlistForm = this.playlistForm.value;
    console.log(playlistForm);
    this.formData.append('playlist', JSON.stringify(playlistForm));
    this.playlistService.editPlaylist(this.formData).subscribe(result => {
      this.playlist = result;
      this.dataTransfer.setData(this.playlist);
      this.route.navigateByUrl('/playlist');
    });
  }

  onChangeBox(id: number) {
    console.log(1);
    const songFormArray = this.playlistForm.controls.songs as FormArray;
    songFormArray.clear();
    for (const item of this.playlist.songs) {
      songFormArray.push(new FormControl(item.id));
    }
  }

  // checkSongs(c: AbstractControl) {
  //   const v = c.value;
  //   return (v.songList.length !== 0) ? null : {
  //     emptySong: true
  //   };
  // }

  deletePlaylist(id: number) {
    if (confirm('Are You Sure You delete this playlist ?')) {

      this.playlistService.deletePlaylist(id).subscribe(re => {
        this.router.navigateByUrl('/playlist');
      });
    }
  }
}

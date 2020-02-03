import {Component, OnInit} from '@angular/core';
import {Playlist} from '../Playlist';
import {PlaylistService} from '../playlist.service';
import {Router} from '@angular/router';
import {DataTransferService} from '../../data-transfer.service';
import {SongService} from '../../song/song.service';
import {Song} from '../../song/Song';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Track} from 'ngx-audio-player';
import {findIndex} from 'rxjs/operators';
import {Location} from '@angular/common';

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


  msaapDisplayTitle = true;
  msaapDisplayPlayList = true;
  msaapPageSizeOptions = [2, 4, 6];
  msaapDisplayVolumeControls = true;

// Material Style Advance Audio Player Playlist
  msaapPlaylist: Track[] = [];
  track: Track = new Track();

  constructor(private playlistService: PlaylistService,
              private fb: FormBuilder,
              private songService: SongService,
              private route: Router,
              private dataTransfer: DataTransferService,
              private location: Location) {
  }

  ngOnInit() {
    // this.loadSongList();
    this.playlist = this.dataTransfer.getDataPlaylist();
    this.songList = this.dataTransfer.getDataSong();
    console.log(this.songList);
    console.log(this.playlist);
    if (this.playlist.songs.length !== 0) {
      this.spliceSongs(this.playlist, this.songList);
      this.trackPlaylist();
    }
    this.playlistForm = this.fb.group({
      id: [this.playlist.id],
      playlistName: [this.playlist.playlistName],
      playlistDescription: [this.playlist.playlistDescription],
      // avatarPlaylist: [this.playlist.avatarPlaylist],
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

  trackPlaylist() {
    for (const item of this.playlist.songs) {
      const track = new Track();
      track.title = item.name;
      track.link = 'http://localhost:8083/file/' + item.fileMp3;
      // console.log('title: ' + this.track.title);
      // console.log('link: ' + this.track.link);
      // console.log(this.track);
      this.msaapPlaylist.push(track);
    }
    console.log(this.msaapPlaylist);
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
      this.goBack();
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
        this.goBack();
      });
    }
  }

  goBack() {
    this.route.navigate(['/playlist']).then(() => {
      window.location.reload();
    });
  }
}

import {Component, OnInit} from '@angular/core';
import {Playlist} from '../Playlist';
import {PlaylistService} from '../playlist.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DataTransferService} from '../../data-transfer.service';
import {SongService} from '../../song/song.service';
import {Song} from '../../song/Song';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Track} from 'ngx-audio-player';
import {findIndex} from 'rxjs/operators';
import {Location} from '@angular/common';
import {LikePlaylist} from '../../LikePlaylist';
import {TokenStorageService} from '../../auth/token-storage.service';

@Component({
  selector: 'app-detail-playlist',
  templateUrl: './detail-playlist.component.html',
  styleUrls: ['./detail-playlist.component.scss']
})
export class DetailPlaylistComponent implements OnInit {

  playlist: Playlist;
  songList: Song[];
  formData = new FormData();
  avatar: any = File;
  playlistForm = new FormGroup({
    id: new FormControl(),
    playlistName: new FormControl(),
    playlistDescription: new FormControl(),
    songs: this.fb.array([]),
  });
  isAddSongToPlaylist = false;
  username: string;
  num: number;
  isFound = false;
  likePlaylists: LikePlaylist[];
  likePlaylist: LikePlaylist;


  msaapDisplayTitle = true;
  msaapDisplayPlayList = true;
  msaapPageSizeOptions = [3, 4, 5];
  msaapDisplayVolumeControls = true;

// Material Style Advance Audio Player Playlist
  msaapPlaylist: Track[] = [];

  constructor(private playlistService: PlaylistService,
              private fb: FormBuilder,
              private songService: SongService,
              private route: Router,
              private dataTransfer: DataTransferService,
              private location: Location,
              private activatedRoute: ActivatedRoute,
              private token: TokenStorageService) {
  }

  ngOnInit() {
    // this.loadSongList();
    const id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.playlistService.getPlaylistById(id).subscribe(result => {
      this.playlist = result;
      console.log(this.playlist);
      this.trackPlaylist();
      this.playlistF(this.playlist);
      this.loadLike();
      this.songService.getSongList().subscribe(data => {
        this.songList = data;
        console.log(this.songList);
        this.spliceSongs(this.playlist, this.songList);
      });
    });
  }

  playlistF(playlist: Playlist) {
    this.playlistForm = this.fb.group({
      id: [playlist.id],
      playlistName: [playlist.playlistName],
      playlistDescription: [playlist.playlistDescription],
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
      const track: Track = new Track();
      track.title = item.name;
      track.link = 'http://localhost:8083/file/' + item.fileMp3;
      console.log('title: ' + track.title);
      console.log('link: ' + track.link);
      console.log(track);
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

  loadLike() {
    this.playlistService.getLikePlaylistByPlaylist(this.playlist).subscribe(result => {
      this.likePlaylists = result;
      console.log(this.likePlaylists.length);
      // this.playlist.likeSong = this.likeSongs.length;
      this.num = this.likePlaylists.length;
      this.checkLike();
      console.log(this.playlist.id);
      this.isHidden();
      this.playlistF(this.playlist);
      const playlistData = this.playlistForm.value;
      const formDataPlaylistLike = new FormData();
      formDataPlaylistLike.append('playlist', JSON.stringify(playlistData));
      // this.songService.updateSongLike(formDataPlaylistLike).subscribe(() => {
      // });
    });
  }

  checkLike() {
    for (const item of this.likePlaylists) {
      if (item.user.username === this.token.getUsername() && item.playlist.id === this.playlist.id) {
        this.isFound = true;
        this.likePlaylist = item;
        console.log(this.likePlaylist.id);
        break;
      }
    }
  }

  isHidden() {
    if (this.isFound) {
      document.getElementById('click1').style.visibility = 'hidden';
      document.getElementById('click2').style.visibility = 'visible';
    } else {
      document.getElementById('click1').style.visibility = 'visible';
      document.getElementById('click2').style.visibility = 'hidden';
    }
  }

  clickUnLike() {
    if (this.token.getUsername()) {
      console.log('clickUnLike');
      console.log(this.isFound);
      if (this.isFound) {
        this.isFound = false;
        this.playlistService.deleteLike(this.likePlaylist.id).subscribe(() => {
          this.loadLike();
        });
      }
    } else {
      alert('Ban can dang nhap de thuc hien.');
    }
  }

  clickLike() {
    if (this.token.getUsername()) {
      console.log('clickLike');
      console.log(this.isFound);
      if (!this.isFound) {
        this.isFound = true;
        this.playlistF(this.playlist);
        const playlistData = this.playlistForm.value;
        console.log(playlistData);
        console.log(this.token.getUsername());
        const formDataPlaylistLike = new FormData();
        formDataPlaylistLike.append('playlist', JSON.stringify(playlistData));
        formDataPlaylistLike.append('username', this.token.getUsername());
        this.playlistService.addLike(formDataPlaylistLike).subscribe(() => {
          this.loadLike();
        });
      }
    } else {
      alert('Ban can dang nhap de thuc hien.');
    }
  }

  goToEditPlaylist(id: number) {
    this.route.navigateByUrl('playlist/edit-playList/' + id);
  }
}

import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {PlaylistService} from '../playlist.service';
import {Router} from '@angular/router';
import {Song} from '../../song/Song';
import {SongService} from '../../song/song.service';

@Component({
  selector: 'app-add-playlist',
  templateUrl: './add-playlist.component.html',
  styleUrls: ['./add-playlist.component.scss']
})
export class AddPlaylistComponent implements OnInit {

  playlistForm: FormGroup;
  songList: Song[];
  avatarPlaylist: any = File;
  selectedValue = null;
  formData = new FormData();

  constructor(private fb: FormBuilder,
              private playlistService: PlaylistService,
              private songService: SongService,
              private route: Router) {
  }

  ngOnInit() {
    this.loadSongList();
    this.playlistForm = this.fb.group({
      playlistName: [''],
      playlistDescription: [''],
      songs: this.fb.array([])
    });
  }

  loadSongList() {
    this.songService.getSongList().subscribe(data => {
      this.songList = data;
    });
  }

  onChangeAvatar(event) {
    const file = event.target.files[0];
    this.avatarPlaylist = file;
  }

  onSubmit() {
    const playlist = this.playlistForm.value;
    this.formData.append('playlist', JSON.stringify(playlist));
    this.formData.append('avatar', this.avatarPlaylist);
    console.log(this.formData);
    this.playlistService.addPlaylist(this.formData).subscribe(result => {
      this.route.navigateByUrl('/playlist');
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

import {Component, OnInit} from '@angular/core';
import {SongService} from '../song.service';
import {Router} from '@angular/router';
import {DataTransferService} from '../../data-transfer.service';
import {Song} from '../Song';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Like} from '../../Like';
import {TokenStorageService} from '../../auth/token-storage.service';
import {User} from '../../auth/User';

@Component({
  selector: 'app-detail-song',
  templateUrl: './detail-song.component.html',
  styleUrls: ['./detail-song.component.scss']
})
export class DetailSongComponent implements OnInit {

  song: Song;
  songForm: FormGroup;
  userForm: FormGroup;
  formData = new FormData();
  likes: Like[];
  like: Like;
  isFound = false;

  // msbapTitle = 'Audio Title';
  // msbapAudioUrl = 'Link to audio URL';

  msbapDisplayTitle = true;
  msbapDisplayVolumeControls = true;

  constructor(private songService: SongService,
              private route: Router,
              private dataTransfer: DataTransferService,
              private fb: FormBuilder,
              private token: TokenStorageService) {
  }

  ngOnInit() {
    this.song = this.dataTransfer.getData();
    this.loadLike();
    this.isHidden();
  }

  loadLike() {
    this.songService.getLikesBySong(this.song).subscribe(data => {
      this.likes = data;
      console.log(this.likes.length);
    });
  }

  songF(song: Song) {
    this.songForm = this.fb.group({
      id: [this.song.id],
      name: [this.song.name],
      description: [this.song.description],
      dateUpload: [this.song.dateUpLoad],
      avatar: [song.avatar],
      listenSong: [song.listenSong],
    });
  }

  playMp3(song: Song) {
    this.songF(song);
    console.log(this.songForm.value);
    setTimeout(() => {
      console.log(1);
      const songData = this.songForm.value;
      this.formData.append('song', JSON.stringify(songData));
      this.songService.updateSongView(this.formData).subscribe(data => {
        console.log(2);
      });
    }, 2000);
  }

  lengthSong(event) {
    const timeSong = event.duration;
    console.log(timeSong);
  }

  checkLike() {
    for (const item of this.likes) {
      if (item.user.username === this.token.getUsername() && item.song.id === this.song.id) {
        this.isFound = true;
        this.like = item;
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
    this.checkLike();
    console.log(this.isFound);
    if (this.isFound) {
      this.isFound = false;
      this.songService.deleteLike(this.like.id).subscribe(() => {
        // this.likes.length--;
        this.loadLike();
      });
    }
  }

  clickLike() {
    this.checkLike();
    console.log(this.isFound);
    if (!this.isFound) {
      this.isFound = true;
      this.songF(this.song);
      const formData = new FormData();
      formData.append('song', JSON.stringify(this.songForm.value));
      formData.append('username', this.token.getUsername());
      this.songService.addLike(formData).subscribe(data => {
        // this.likes.length++;
        this.loadLike();
      });
    }
    // else {
    //   this.songService.deleteLike(this.like.id).subscribe(() => {
    //     this.count--;
    //     this.loadLike();
    //     this.checkLike();
    //   });
    // }
  }
}

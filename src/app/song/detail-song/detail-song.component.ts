import {Component, OnInit} from '@angular/core';
import {SongService} from '../song.service';
import {ActivatedRoute, Router} from '@angular/router';
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
  nameSong: string;
  listenSong: number;
  fileNameMp3: string;
  username: string;
  num: number;

  // msbapTitle = 'Audio Title';
  // msbapAudioUrl = 'Link to audio URL';

  msbapDisplayTitle = true;
  msbapDisplayVolumeControls = true;

  constructor(private songService: SongService,
              private route: Router,
              private activatedRoute: ActivatedRoute,
              private dataTransfer: DataTransferService,
              private fb: FormBuilder,
              private token: TokenStorageService) {
  }

  ngOnInit() {
    const id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.songService.getSongById(id).subscribe(data => {
      this.song = data;
      console.log(this.song);
      this.nameSong = this.song.name;
      this.listenSong = this.song.listenSong;
      this.fileNameMp3 = this.song.fileMp3;
      this.username = this.song.username;
      this.loadLike();
    });
  }

  loadLike() {
    this.songService.getLikesBySong(this.song).subscribe(data => {
      this.likes = data;
      console.log(this.likes.length);
      this.song.likeSong = this.likes.length;
      this.num = this.likes.length;
      this.checkLike();
      this.isHidden();
      this.songF(this.song);
      const songData = this.songForm.value;
      const formDataSongLike = new FormData();
      formDataSongLike.append('song', JSON.stringify(songData));
      this.songService.updateSongLike(formDataSongLike).subscribe(() => {
      });
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
      likeSong: [song.likeSong],
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
        console.log(this.like.id);
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
        this.songService.deleteLike(this.like.id).subscribe(() => {
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
        this.songF(this.song);
        const songData = this.songForm.value;
        console.log(songData);
        console.log(this.token.getUsername());
        const formDataSongLike = new FormData();
        formDataSongLike.append('song', JSON.stringify(songData));
        formDataSongLike.append('username', this.token.getUsername());
        this.songService.addLike(formDataSongLike).subscribe(() => {
          this.loadLike();
        });
      }
    } else {
      alert('Ban can dang nhap de thuc hien.');
    }
  }
}

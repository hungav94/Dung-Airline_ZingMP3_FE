import {Component, OnInit} from '@angular/core';
import {SongService} from '../song.service';
import {Router} from '@angular/router';
import {DataTransferService} from '../../data-transfer.service';
import {Song} from '../Song';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-detail-song',
  templateUrl: './detail-song.component.html',
  styleUrls: ['./detail-song.component.scss']
})
export class DetailSongComponent implements OnInit {

  song: Song;
  songForm: FormGroup;
  formData = new FormData();
  isClick: boolean;
  num = 0;

  // msbapTitle = 'Audio Title';
  // msbapAudioUrl = 'Link to audio URL';

  msbapDisplayTitle = true;
  msbapDisplayVolumeControls = true;

  constructor(private songService: SongService,
              private route: Router,
              private dataTransfer: DataTransferService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.song = this.dataTransfer.getData();
  }

  // playMp3(song: Song) {
  //   this.num++;
  //   if (this.num % 2 !== 0) {
  //     this.isClick = true;
  //   } else {
  //     this.isClick = false;
  //   }
  //   if (this.isClick) {
  //     console.log(this.isClick);
  //     let count = 0;
  //     if (localStorage.getItem('' + song.id) === undefined) {
  //       count++;
  //       localStorage.setItem('' + song.id, '' + count);
  //       console.log(localStorage.getItem('' + song.id));
  //     } else {
  //       count = Number(localStorage.getItem('' + song.id));
  //       count++;
  //       localStorage.setItem('' + song.id, '' + count);
  //       console.log(localStorage.getItem('' + song.id));
  //     }
  //   }
  // }

  playMp3(song: Song) {
    this.songForm = this.fb.group({
      id: [this.song.id],
      name: [this.song.name],
      description: [this.song.description],
      dateUpload: [this.song.dateUpLoad],
      avatar: [song.avatar],
      listenSong: [song.listenSong],
    });
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
}

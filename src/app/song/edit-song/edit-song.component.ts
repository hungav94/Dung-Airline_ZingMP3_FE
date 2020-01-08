import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SongService} from '../song.service';
import {DataTransferService} from '../../data-transfer.service';
import {Song} from '../Song';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-edit-song',
  templateUrl: './edit-song.component.html',
  styleUrls: ['./edit-song.component.scss']
})
export class EditSongComponent implements OnInit {
  song: Song;
  songForm: FormGroup;
  formData = new FormData();
  avatar: any = File;
  fileMp3: any = File;

  constructor(private fb: FormBuilder,
              private songService: SongService,
              private router: Router,
              private dataTransfer: DataTransferService) {
  }

  ngOnInit() {
    this.song = this.dataTransfer.getData();
    this.songForm = this.fb.group({
      id: [this.song.id],
      name: [this.song.name],
      description: [this.song.description],
      dateUpload: [this.song.dateUpLoad],
      avatar: [this.song.avatar]
    });
  }

  onchangeAvatar(event) {
    const file = event.target.files[0];
    this.avatar = file;
  }


  onSubmit() {
    const songAvatar = this.songForm.value;
    this.formData.append('song', JSON.stringify(songAvatar));
    this.formData.append('avatar', this.avatar);
    this.songService.editSong(this.formData).subscribe(result => {
      this.router.navigateByUrl('/song/songList');
    });
  }


}

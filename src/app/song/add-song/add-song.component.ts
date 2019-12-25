import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SongService} from '../song.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.scss']
})
export class AddSongComponent implements OnInit {

  songForm: FormGroup;
  avatar: any = File;
  fileMp3: any = File;
  formData = new FormData();

  constructor(private fb: FormBuilder,
              private songService: SongService,
              private router: Router) {
  }

  ngOnInit() {
    this.songForm = this.fb.group({
      name: [''],
      description: [''],
      dateUpload: ['']
    });
  }

  onChangeAvatar(event) {
    const file = event.target.files[0];
    this.avatar = file;
  }

  onChangeFileMp3(event) {
    const file = event.target.files[0];
    this.fileMp3 = file;
  }

  onSubmit() {
    const song = this.songForm.value;
    this.formData.append('song', JSON.stringify(song));
    this.formData.append('avatar', this.avatar);
    this.formData.append('fileMp3', this.fileMp3);
    // if (confirm('Are You Sure?')) {
    this.songService.addSong(this.formData).subscribe(result => {
        this.router.navigateByUrl('/songList');
      });
    // }
  }

}

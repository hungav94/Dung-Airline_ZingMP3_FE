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

  constructor(private fb: FormBuilder,
              private songService: SongService,
              private router: Router) {
  }

  ngOnInit() {
    this.songForm = this.fb.group({
      name: [''],
      description: [''],
      avatar: [''],
      dateUpload: [''],
      fileMp3: [''],
    });
  }

  onSubmit() {
    if (confirm('Are You Sure?')) {
      this.songService.addSong(this.songForm.value).subscribe(re => {
        this.router.navigateByUrl('/songList');
      });
    }
  }

}

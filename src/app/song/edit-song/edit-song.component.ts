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
  songs: Song[];
  song: Song;
  songForm: FormGroup;

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
      avatar: [this.song.avatar],
      fileMp3: [this.song.fileMp3],
    });
  }


  onSubmit() {
    this.songService.editSong(this.songForm.value);
    this.router.navigateByUrl('/songList');
  }
}

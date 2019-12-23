import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddSongComponent } from './add-song/add-song.component';
import { EditSongComponent } from './edit-song/edit-song.component';
import { ListSongComponent } from './list-song/list-song.component';



@NgModule({
  declarations: [AddSongComponent, EditSongComponent, ListSongComponent],
  imports: [
    CommonModule
  ]
})
export class SongModule { }

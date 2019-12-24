import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddSongComponent } from './add-song/add-song.component';
import { EditSongComponent } from './edit-song/edit-song.component';
import { ListSongComponent } from './list-song/list-song.component';
import {HttpClientModule} from '@angular/common/http';
import {SongRouting} from './song-routing.module';



@NgModule({
  declarations: [AddSongComponent, EditSongComponent, ListSongComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    SongRouting
  ]
})
export class SongModule { }

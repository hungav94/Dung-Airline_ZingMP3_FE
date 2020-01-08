import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddSongComponent} from './add-song/add-song.component';
import {EditSongComponent} from './edit-song/edit-song.component';
import {ListSongComponent} from './list-song/list-song.component';
import {HttpClientModule} from '@angular/common/http';
import {SongRouting} from './song-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {SongService} from './song.service';
import {httpInterceptorProviders} from '../auth/auth-interceptor';


@NgModule({
  declarations: [AddSongComponent, EditSongComponent, ListSongComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    SongRouting,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [SongService, httpInterceptorProviders]
})
export class SongModule {
}

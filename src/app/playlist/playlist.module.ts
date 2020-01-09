import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPlaylistComponent } from './add-playlist/add-playlist.component';
import { EditPlaylistComponent } from './edit-playlist/edit-playlist.component';
import { ListPlaylistComponent } from './list-playlist/list-playlist.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {PlaylistRoutingModule} from './playlist-routing.module';
import {httpInterceptorProviders} from '../auth/auth-interceptor';
import {PlaylistService} from './playlist.service';



@NgModule({
  declarations: [AddPlaylistComponent, EditPlaylistComponent, ListPlaylistComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    PlaylistRoutingModule
  ],
  providers: [PlaylistService, httpInterceptorProviders]
})
export class PlaylistModule { }

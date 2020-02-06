import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListPlaylistComponent} from './list-playlist/list-playlist.component';
import {AddPlaylistComponent} from './add-playlist/add-playlist.component';
import {EditPlaylistComponent} from './edit-playlist/edit-playlist.component';
import {DetailPlaylistComponent} from './detail-playlist/detail-playlist.component';


const routes: Routes = [
  {
    path: '',
    component: ListPlaylistComponent
  },
  {
    path: 'add-playList',
    component: AddPlaylistComponent
  },
  {
    path: 'edit-playList/:id',
    component: EditPlaylistComponent
  },
  {
    path: 'detail-playList/:id',
    component: DetailPlaylistComponent
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PlaylistRoutingModule { }

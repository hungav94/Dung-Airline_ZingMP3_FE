import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListPlaylistComponent} from './list-playlist/list-playlist.component';
import {AddPlaylistComponent} from './add-playlist/add-playlist.component';
import {EditPlaylistComponent} from './edit-playlist/edit-playlist.component';


const routes: Routes = [
  {
    path: 'playList',
    component: ListPlaylistComponent
  },
  {
    path: 'add-playList',
    component: AddPlaylistComponent
  },
  {
    path: 'edit-playList',
    component: EditPlaylistComponent
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PlaylistRoutingModule { }

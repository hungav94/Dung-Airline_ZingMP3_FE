import {RouterModule, Routes} from '@angular/router';
import {ListSongComponent} from './list-song/list-song.component';
import {NgModule} from '@angular/core';
import {AddSongComponent} from './add-song/add-song.component';
import {EditSongComponent} from './edit-song/edit-song.component';
import {ViewSongComponent} from './view-song/view-song.component';

const routes: Routes = [
  {
    path: 'songList',
    component: ListSongComponent
  },
  {
    path: 'addSong',
    component: AddSongComponent
  },
  {
    path: 'editSong',
    component: EditSongComponent
  },
  {
    path: 'view',
    component: ViewSongComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SongRouting {

}

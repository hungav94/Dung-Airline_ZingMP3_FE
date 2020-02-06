import {RouterModule, Routes} from '@angular/router';
import {ListSongComponent} from './list-song/list-song.component';
import {NgModule} from '@angular/core';
import {AddSongComponent} from './add-song/add-song.component';
import {EditSongComponent} from './edit-song/edit-song.component';
import {DetailSongComponent} from './detail-song/detail-song.component';
import {AuthGuard} from '../auth/auth.guard';


const routes: Routes = [
  {
    path: 'songList',
    component: ListSongComponent
  },
  {
    path: 'addSong',
    component: AddSongComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'editSong/:id',
    component: EditSongComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'detail-song/:id',
    component: DetailSongComponent
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

import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserComponent} from './user/user.component';
import {PmComponent} from './pm/pm.component';
import {AdminComponent} from './admin/admin.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {Login1Component} from './login1/login1.component';
import {Register1Component} from './register1/register1.component';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  {
    path: 'playlist',
    loadChildren: './playlist/playlist.module#PlaylistModule'
  },
  {
    path: 'song',
    loadChildren: './song/song.module#SongModule',
    // runGuardsAndResolvers: 'always'
  },
  {
    path: 'login1',
    component: Login1Component,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'Register1',
    component: Register1Component
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'pm',
    component: PmComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'auth/login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: RegisterComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

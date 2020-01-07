import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {Login1Component} from './login1/login1.component';
import {Register1Component} from './register1/register1.component';


const routes: Routes = [
  {
    path: '',
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
    path: 'Register',
    component: RegisterComponent
  },
  {
    path: 'Register1',
    component: Register1Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

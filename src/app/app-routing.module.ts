import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from './loginGuard/login.guard';
import { MainComponent } from './main/main/main.component';
import { NeedLoginComponent } from './need-login/need-login.component';
import { ViewUserComponent } from './view-user/view-user.component';

const routes: Routes = [
  { path: 'main', component: MainComponent, canActivate: [LoginGuard] },
  { path: 'user/:userId', component: ViewUserComponent, canActivate: [LoginGuard] },
  { path: 'add/user', component: ViewUserComponent, canActivate: [LoginGuard] },
  { path: '**', component: NeedLoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

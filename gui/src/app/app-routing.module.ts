import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { UsersComponent } from './user/users/users.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { EditSpecificUserComponent } from './user/edit-specific-user/edit-specific-user.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path:'userRegister',
    component:UserRegisterComponent
  },
  {
    path:'users',
    component:UsersComponent
  },
  {
    path:'edit',
    component:EditSpecificUserComponent},
  {
    path:'welcome',
    component:WelcomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

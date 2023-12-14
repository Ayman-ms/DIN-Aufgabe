import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule , ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { UsersComponent } from './user/users/users.component';
import { UsersService } from './services/users.service';
import { WelcomeComponent } from './welcome/welcome.component';
import { EditSpecificUserComponent } from './user/edit-specific-user/edit-specific-user.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    UserRegisterComponent,
    UsersComponent,
    WelcomeComponent,
    EditSpecificUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }

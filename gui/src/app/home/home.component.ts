import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../services/session.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { AlertifyService } from '../services/alertify.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userToLogin: User = { id: 0, userName: '', password: '', email: '', roll: '' };


  constructor(private route: ActivatedRoute, 
    private router: Router, 
    private httpClient: HttpClient,
    private userServic: UsersService, 
    private accountService: SessionService,
    private alertify:AlertifyService) { }

    userList?: Array<User>;
  ngOnInit(): void {
    this.httpClient.get<Array<User>>('https://localhost:44355/User').subscribe((userListItems) => {
      this.userList = userListItems;
    })
  }
  userForm = new FormGroup({
    userNameControl: new FormControl(null,
      Validators.required),

    passwordControl: new FormControl(null,
      [Validators.minLength(6),
      Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$"),
      Validators.required])
  })

  async loginClick(){
    let userListItems = await this.userList;    
    let login = false;
    let userToLogin: User = {} as any;
    if (userListItems) {
      for (let i = 0; i < userListItems.length; i++) {
        
         if ((userListItems[i].userName == this.userToLogin.userName || userListItems[i].email == this.userToLogin.email)
          && (userListItems[i].password == await this.sha256(this.userToLogin.password!))) {
          login = true;
          userToLogin = userListItems[i];
          this.router.navigateByUrl('')
          localStorage.setItem('user', JSON.stringify(userListItems[i]));
          break;
        }
      }
    }
    if (login) {
      this.accountService.login(userToLogin)
      this.alertify.success('You Are Welcome');
      this.router.navigateByUrl('welcome')
    }
    else {
      this.alertify.error('User Name or Password False');
    }
  }

  async sha256(message: string) {
    // encode as UTF-8
    const msgBuffer = new TextEncoder().encode(message);

    // hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    // convert bytes to hex string                  
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  }

}
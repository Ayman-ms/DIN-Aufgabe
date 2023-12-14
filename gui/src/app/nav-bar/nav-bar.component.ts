import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { User } from '../model/user';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  userToEdit: User = { id: 0, userName: '', password: '', email: '', roll: '' };
  userList?: Array<User>;
  userIsAdmin = false;
  userLoggedIn = false;
  constructor( public accountService: SessionService, private httpClient: HttpClient) {

    accountService.user.subscribe((u) => {
      this.userToEdit = u;
      if (u && u.roll != 'user') {
        this.userIsAdmin = true;
      }
      else {
        this.userIsAdmin = false;
      }

      if (u && u.userName != 'anonymos') {
        this.userLoggedIn = true;
      }
      else {
        this.userLoggedIn = false;
      }
    });
  }
  
  ngOnInit(): void {
    this.httpClient.get<Array<User>>('https://localhost:44355/User').subscribe((userListItems) => {
      this.userList = userListItems;
    })
  }


}

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { SessionService } from 'src/app/services/session.service';
import { UsersService } from 'src/app/services/users.service';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-edit-specific-user',
  templateUrl: './edit-specific-user.component.html',
  styleUrls: ['./edit-specific-user.component.css']
})
export class EditSpecificUserComponent {

  userToEdit: User = { id: 0, userName: '', password: '', email: '', roll: '' };
  userIsAdmin = false;
  userLoggedIn = false;
  userList?: Array<User>;

  userForm = new FormGroup({
    userNameControl: new FormControl(null,
      Validators.required),

    emailControl: new FormControl(null,
      [Validators.email,
      Validators.required]),

    passwordControl: new FormControl(null,
      [Validators.minLength(6),
      Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$"),
      Validators.required]),
    
    rollControl:new FormControl(null)
  }
  )

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient,
    private userServic: UsersService,
    public accountService: SessionService,
    public alertify:AlertifyService)
      {
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
      this.route.queryParams
        .subscribe(params => {
          console.log(params['id']);
          for (let i = 0; i < userListItems.length; i++) {
            if (userListItems[i].id == params['id']) {
              this.userToEdit = userListItems[i];
              break;
            }
          }
        });
    });
  }
       
  async updateClick() {

    let result = await this.userServic.updateUser(this.userToEdit);
    if (result) {
      this.alertify.success( 'Success..');
      this.router.navigateByUrl('editUser')
      this.router.navigateByUrl('')
    } else {
      alert("Edit not success")
    }
  }
  clickMessage() {
    this.alertify.warning( 'Info');
  }
    
}

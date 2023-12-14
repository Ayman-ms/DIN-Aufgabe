import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
  userToEdit: User = { id: 0, userName: '', password: '', email: '', roll: '' };

  // form control
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
  	
  // constructor
  constructor(private route: ActivatedRoute, private httpClient: HttpClient,
    private userServic: UsersService,
    private router: Router,
    private alertify:AlertifyService) { }

  // get all users
  userList!: Array<User>;
  ngOnInit(): void {
    this.httpClient.get<Array<User>>('https://localhost:44355/User').subscribe((userListItems) => {
      this.userList = userListItems;
    })    
  }
  
  // delete user
  async deleteUserClick(id: number) {
    let result = await this.userServic.deleteUser(id);

    if (result) {
      window.location.reload()
      this.alertify.success('Delete User Success');
    } else {
      this.alertify.error('Something Error');
    }
  }
  }

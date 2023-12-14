import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { AlertifyService } from 'src/app/services/alertify.service';


@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit{

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
  })

  rightPassword = true;
  allText = true;

  public userToAdd: User = { id: 0, userName: '', password: '', email: '', roll: '' };

  registerForm!: FormGroup;
  user:any={}
  userSubmitted!: boolean;
  passwordMatchingValidatior: any;


  constructor(
    private userServier: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    private alertify:AlertifyService )
    { }

  ngOnInit() {
 
  }

// add new user
async newUser() {
  console.log('1');
  
  let result = await this.userServier.creatUser(this.userToAdd);
  console.log('2');

  if (result) {
    this.alertify.success('Success message');
  console.log('Success');

    this.router.navigateByUrl('')
  } else {
    this.alertify.error('Error message');
  console.log('not Success');
    
  }
}

}

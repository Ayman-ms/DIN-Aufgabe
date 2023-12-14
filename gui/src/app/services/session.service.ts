import { Injectable } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({ providedIn: 'root' })
export class SessionService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user') as any));
    this.user = this.userSubject.asObservable();

  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(user: User) {
    this.userSubject.next(user);
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user') as any)
  }

  logout() {
    localStorage.removeItem('user');
    const u: User = {
      userName: 'anonymos',
      id: 0,
      password: '',
      email: '',
      roll: ''
    };
    this.userSubject.next(u);
    // this.router.navigateByUrl('')
    window.location.reload();
    

    
  }


}
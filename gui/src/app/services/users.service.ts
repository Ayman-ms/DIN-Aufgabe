import { Injectable } from '@angular/core';
import { User } from '../model/user'; 
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public creatUser(user: User) {
    return this.httpClient.post<User>('https://localhost:44355/User', user).toPromise();
  }

  public updateUser(user: User) {
    return this.httpClient.put<User>('https://localhost:44355/User', user).toPromise();
  }


  public deleteUser(id: number) {
    return this.httpClient.delete<number>('https://localhost:44355/User', { params: { id: id } }).toPromise();
  }
  public getUserList() {
    return this.httpClient.get<Array<User>>('https://localhost:44355/User').toPromise();
  }
  
  // get specific user
  getById(id: number) {
    return this.httpClient.get<User>(`https://localhost:44355/User/${id}`).toPromise();
  }

}

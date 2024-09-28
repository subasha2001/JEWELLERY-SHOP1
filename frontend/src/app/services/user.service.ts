import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { USERS_LOGIN_URL, USERS_REGISTER_URL } from '../shared/models/constants/urls';
import { User } from '../shared/models/user';
import { IUserLogin } from '../shared/models/interfaces/iUserLogin';
import { ToastrService } from 'ngx-toastr';
import { IUserRegister } from '../shared/models/interfaces/iUserRegister';

const USER_KEY = 'User'

@Injectable({
  providedIn: 'root'
})
export class UserService {

    private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
    public userObservable: Observable<User>;
    
    constructor(
      private http: HttpClient, 
      private toastr: ToastrService
    ) {
      this.userObservable = this.userSubject.asObservable();
    }
  
    public get currentUser(): User {
      return this.userSubject.value;
    }
  
    login(userLogin: IUserLogin): Observable<User> {
      return this.http.post<User>(USERS_LOGIN_URL, userLogin).pipe(
        tap({
          next: (user) => {
            this.setUserToLocalStorage(user);
            this.userSubject.next(user);
            this.toastr.success(
              `Welcome to FoodMine ${user.name}!`,
              'Login Successful'
            )
          },
          error: (errorResponse) => {
            this.toastr.error(errorResponse.error, 'Login Failed');
          }
        })
      )
    }

    register(userRegister: IUserRegister): Observable<User> {
      return this.http.post<User>(USERS_REGISTER_URL, userRegister).pipe(
        tap({
          next: (user) => {
            this.setUserToLocalStorage(user);
            this.userSubject.next(user);
            this.toastr.success(
              `Welcome to FoodMine ${user.name}!`,
              `Registration Successful`
            )
          },
          error: (errorResponse) => {
            this.toastr.error(errorResponse.error, 'Registration Failed!')
          }
        })
      )
    }
  
    logout() {
      this.userSubject.next(new User());
      localStorage.removeItem(USER_KEY);
      window.location.reload();
    }

    private setUserToLocalStorage(user: User) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
    private getUserFromLocalStorage(): User {
      if(typeof localStorage!== 'undefined'){
        const userJson = localStorage.getItem(USER_KEY);
        if (userJson) return JSON.parse(userJson) as User;
      }
      return new User()
    }
}
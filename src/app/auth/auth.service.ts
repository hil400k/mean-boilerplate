import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;

  constructor(
    private http: HttpClient
  ) {
  }

  getToken() {
    return this.token;
  }

  createUser(email: string, password: string) {
    const authData: AuthData = {
      email,
      password
    };
    this.http.post('http://localhost:3000/user/signup', authData)
      .subscribe((response) => {
        console.info(response);
      });
  }

  loginUser(email: string, password: string) {
    const authData: AuthData = {
      email,
      password
    };
    this.http.post<{ token: string }>('http://localhost:3000/user/login', authData)
      .subscribe((response) => {
        this.token = response.token;
      });
  }
}

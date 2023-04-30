import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VcEHICService } from './vcEHIC.service';
import { Params, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = false;
  constructor(
    private _httpClient: HttpClient,
    private service: VcEHICService,
    private router: Router
  ) {}

  login(username: string, password: string, params: Params) {
    console.log('DONT FORGET TO DESTROY OBSERVABLES!');
    this.service.logIn(username, password).subscribe({
      next: (data) => {
        localStorage.setItem('token', data.token);
        this.service.auth_token = data.token;
        this.router.navigate(['/wallet'], { queryParams: params });
        this.isLoggedIn = true;
        console.log(data.token);
        console.log(data);
      },
      error: (error) => {
        alert(error);
      },
      complete: () => {},
    });
  }
  logout() {
    this.service.auth_token = '';
    this.isLoggedIn = false;
  }
  isAuth() {
    return this.isLoggedIn;
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hasSubmitted: boolean;
  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.hasSubmitted = false;
    this.loginForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    console.log('Onsubmit has been called..');
    this.hasSubmitted = true;
    if (this.loginForm.valid) {
      this.route.queryParams.subscribe({
        next: (params) => {
          this.authService.login(
            this.username?.value,
            this.password?.value,
            params
          );
        },
        error: (error) => {
          alert(error);
        },
        complete: () => {},
      });
      this.loginForm.reset();
      this.hasSubmitted = false;
    } else {
      alert('Kindly fill required fields');
    }
  }
}

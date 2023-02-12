import { LoggedInService } from './../../logged-in.service';
import { PassDataService } from './../../pass-data.service';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  validateForm: FormGroup;
  token: any;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private PassDataService: PassDataService,
    private LoggedInService: LoggedInService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      this.http.get<any>('http://localhost:3000/signupUsersList').subscribe(
        (res) => {
          const user = res.find((a: any) => {
            this.token = a;
            return (
              a.email === this.validateForm.value.email &&
              a.password === this.validateForm.value.password
            );
          });
          if (user) {
            // alert('Login Succesful');
            this.LoggedInService.LoggedIn = false;
            this.validateForm.reset();
            this.PassDataService.setFormGroup(this.token);
            this.router.navigate(['main']);
          } else {
            alert('user not found');
          }
        },
        (err) => {
          alert('Something went wrong');
        }
      );
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
        console.error('invalid');
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  validateForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.confirmPassword.addValidators(
      this.createCompareValidator(
        this.validateForm.get('password'),
        this.validateForm.get('confirmPassword')
      )
    );
  }

  buildForm(): void {
    this.validateForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, [Validators.required]],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
    });
  }

  submitForm(): void {
    const client = {
      email: this.email.value,
      password: this.password.value,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
    };
    if (this.validateForm.valid) {
      this.http.get<any>('http://localhost:3000/signupUsersList').subscribe(
        (res) => {
          const user = res.find((a: any) => {
            return a.email === client.email;
          });

          if (user) {
            alert('email already exist');
          } else {
            this.http
              .post<any>('http://localhost:3000/signupUsersList', client)
              .subscribe(
                (res) => {
                  alert('SIGNIN SUCCESFUL');
                  this.validateForm.reset();
                  this.router.navigate(['login']);
                },
                (err) => {
                  alert('Something went wrong');
                  console.log(err);
                }
              );
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
      });
    }
  }

  createCompareValidator(
    controlOne: AbstractControl,
    controlTwo: AbstractControl
  ) {
    return () => {
      if (controlOne.value !== controlTwo.value)
        return { match_error: 'Value does not match' };
      return null;
    };
  }

  get email(): FormControl {
    return this.validateForm.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.validateForm.get('password') as FormControl;
  }

  get confirmPassword(): FormControl {
    return this.validateForm.get('confirmPassword') as FormControl;
  }

  get firstName(): FormControl {
    return this.validateForm.get('firstName') as FormControl;
  }

  get lastName(): FormControl {
    return this.validateForm.get('lastName') as FormControl;
  }
}

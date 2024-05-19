import { User } from '@/app/interfaces';
import { AuthService } from '@/app/services';
import { formFieldTypes } from '@/app/types';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatButton,
    MatError,
    MatFormField,
    MatLabel,
    MatInput,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  emailMessage: string = 'Email is not-valid';
  passwordMessage: string = 'min. length of 4 characters';

  form: FormGroup;

  constructor(
    private authService: AuthService,
    private matSnackBar: MatSnackBar,
    private router: Router
  ) {
    this.initForm();
  }

  submit(): void {
    const users: User[] = this.authService.getUsers();
    const user: User | undefined = users.find(
      (userEmail: User) => userEmail.email === this.form.value.email
    );

    if (!user) {
      this.matSnackBar.open('There is no such user!');
      return;
    } else if (this.form.value.password !== user?.password) {
      this.matSnackBar.open('Wrong password!');
      return;
    }

    users.map((User: User) => {
      if (User.username === user?.username) {
        User.isAuth = true;
      }
    });
    localStorage.setItem('users', JSON.stringify(users));

    this.matSnackBar.open('Authorization was successful!');
    this.router.navigate(['']);
    this.authService.isAuth$.next(true);
    this.authService.activeUser = user;
    return;
  }

  public getErrorMessage(fieldName: formFieldTypes): string {
    const field: AbstractControl = this.form.controls[fieldName];
    const isRequired: boolean = field?.errors?.['required'];

    if (isRequired) {
      return 'Field is required';
    }

    return fieldName === 'email' ? this.emailMessage : this.passwordMessage;
  }

  private initForm(): void {
    this.form = new FormGroup<any>({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }
}

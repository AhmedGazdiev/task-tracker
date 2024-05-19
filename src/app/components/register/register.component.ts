import type { User } from '@/app/interfaces';
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
import {
  MatError,
  MatFormField,
  MatInput,
  MatLabel,
} from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatButton,
    MatError,
    MatFormField,
    MatLabel,
    MatInput,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  emailMessage: string = 'Email is not-valid';
  passwordMessage: string = 'min. length of 4 characters';

  form: FormGroup;

  constructor(
    private matSnackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService
  ) {
    this.initForm();
  }

  public submit(): void {
    const userData: User = {
      email: this.form.value.email,
      username: this.form.value.username,
      password: this.form.value.password,
      isAuth: true,
    };

    const users: User[] = this.authService.getUsers();
    users.push(userData);

    localStorage.setItem('users', JSON.stringify(users));

    this.matSnackBar.open('Registration was successful!');
    this.router.navigate(['']);
    this.authService.isAuth$.next(true);
    this.authService.activeUser = userData;
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
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }
}

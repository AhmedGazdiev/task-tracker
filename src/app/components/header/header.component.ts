import { User } from '@/app/interfaces';
import { AuthService } from '@/app/services';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatButton, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public isAuth$: Observable<boolean>;

  constructor(private router: Router, public authService: AuthService) {}

  public logout(): void {
    const users: User[] = this.authService.getUsers();

    users.map((user: User) => {
      if (user.username === this.authService.activeUser?.username) {
        user.isAuth = false;
      }
    });
    localStorage.setItem('users', JSON.stringify(users));

    this.router.navigateByUrl('/login');
    this.authService.activeUser = null;
    this.authService.isAuth$.next(false);
  }
}

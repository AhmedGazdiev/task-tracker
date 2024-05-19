import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuth$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public activeUser: User | null;

  constructor() {
    this.checkIsAuth();
  }

  public getUsers(): User[] {
    return !!localStorage.getItem('users')
      ? JSON.parse(localStorage.getItem('users') || '')
      : [];
  }

  private checkIsAuth(): void {
    const users: User[] = this.getUsers();
    const activeUser: User | undefined | null = this.getUsers().length
      ? this.getUsers().find((user: User) => user.isAuth)
      : null;

    this.activeUser = activeUser as User;
    this.isAuth$.next(!!activeUser);
  }
}

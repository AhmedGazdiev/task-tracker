import {
  HomeComponent,
  LoginComponent,
  NotFoundComponent,
  RegisterComponent,
  TaskTrackerComponent,
} from '@/app/components';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: '***',
    component: NotFoundComponent,
  },

  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'task-tracker',
    component: TaskTrackerComponent,
  },
];

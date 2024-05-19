import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatOption, MatSelect } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { TaskTrackerListComponent } from '../task-tracker-list/task-tracker-list.component';

import { MatFormField, MatInput, MatLabel } from '@angular/material/input';

@Component({
  selector: 'app-task-tracker',
  standalone: true,
  imports: [
    MatButton,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormField,
    MatSelect,
    MatLabel,
    MatOption,
    MatInput,
    TaskTrackerListComponent,
  ],
  templateUrl: './task-tracker.component.html',
  styleUrl: './task-tracker.component.scss',
})
export class TaskTrackerComponent {
  public form: FormGroup;

  public submit(): void {}
}

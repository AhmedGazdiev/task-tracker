import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-task-tracker-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-tracker-list.component.html',
  styleUrl: './task-tracker-list.component.scss',
})
export class TaskTrackerListComponent {}

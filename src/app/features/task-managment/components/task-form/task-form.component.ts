import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  template: `
    <form [formGroup]="taskForm">
      <mat-form-field appearance="fill">
        <mat-label>Название</mat-label>
        <input matInput formControlName="title" required>
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Описание</mat-label>
        <textarea matInput formControlName="description"></textarea>
      </mat-form-field>

      <!-- Остальные поля формы -->
    </form>
  `
})
export class TaskFormComponent {
  taskForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl(''),
    inputExamples: new FormControl([]),
    outputExamples: new FormControl([]),
    difficultyLevel: new FormControl(1),
    tags: new FormControl([])
  });
}

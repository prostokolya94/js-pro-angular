import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Location} from '@angular/common';

@Component({
  selector: 'app-task-form',
  standalone: false,
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

      <mat-card-actions align="end">
        <button mat-button color="default" (click)="location.back()">
          Отмена
        </button>
        <button mat-raised-button color="primary" type="submit">
          Сохранить
        </button>
      </mat-card-actions>
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
    tags: new FormControl([]),
  });

  constructor(
    protected location: Location
  ) {}
}

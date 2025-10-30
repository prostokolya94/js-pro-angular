import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Location} from '@angular/common';
import {MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TaskService} from '../../../../core/services/task.service';

@Component({
  selector: 'app-task-form',
  standalone: false,
  styleUrls: ['./task-form.component.css'],
  template: `
    <form [formGroup]="taskForm" class="form">
      <mat-form-field appearance="fill" class="form-field">
        <mat-label>Название</mat-label>
        <input matInput formControlName="title" required>
      </mat-form-field>

      <mat-form-field appearance="fill" class="form-field">
        <mat-label>Уровень сложности</mat-label>
        <input matInput formControlName="difficultyLevel" type="number">
      </mat-form-field>

      <mat-form-field appearance="fill" class="form-field">
        <mat-label>Описание</mat-label>
        <textarea matInput formControlName="description"></textarea>
      </mat-form-field>

      <mat-card-actions class="form-buttons">
        <button mat-button color="default" (click)="onCancel()">
          Отмена
        </button>
        <button mat-raised-button color="primary" type="submit" (click)="onSubmit($event)">
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
    difficultyLevel: new FormControl(1),
    tags: new FormControl([]),
  });


  onCancel() {
    this.dialogRef.close()
  }

  onSubmit(event: Event) {
    event.preventDefault();
    const {title, difficultyLevel, description} = this.taskForm.value;
    this.taskService.createTask({title: title as string, description: description as string, difficultyLevel: difficultyLevel as number}).subscribe({
      next: () => {
        this.snackBar.open('Задача создана', 'Закрыть', {
          duration: 3000
        });
        this.dialogRef.close();
      },
      error: (error: any) => {
        this.snackBar.open(`Ошибка: ${error.error.message || 'Неизвестная ошибка'}`, 'Закрыть', {
          duration: 5000
        });
        this.dialogRef.close();
      }
    });
  }

  constructor(
    protected location: Location,
    private dialogRef: MatDialogRef<TaskFormComponent>,
    private taskService: TaskService,
    private snackBar: MatSnackBar,
  ) {}
}

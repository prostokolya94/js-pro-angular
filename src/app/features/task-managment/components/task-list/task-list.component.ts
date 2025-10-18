import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../task-form/task-form.component';
import {TaskService} from '../../../../core/services/task.service';
import {Task} from '../../../../shared/models/task/task.model';

@Component({
  selector: 'app-task-list',
  standalone: false,
  template: `
    <div class="container">
      <button mat-raised-button color="primary" (click)="openTaskForm()">
        Добавить задачу
      </button>

      <mat-table [dataSource]="tasks">
        <!-- Колонки таблицы -->
        <ng-container matColumnDef="title">
          <mat-header-cell *matHeaderCellDef>Название</mat-header-cell>
          <mat-cell *matCellDef="let task">{{ task.title }}</mat-cell>
        </ng-container>

        <mat-header-row *matHeaderRowDef="columns"></mat-header-row>
        <mat-row *matRowDef="let row; columns: columns;"></mat-row>
      </mat-table>
    </div>
  `
})
export class TaskListComponent implements OnInit {
  tasks:Task[] = [];
  columns = ['title'];

  constructor(private dialog: MatDialog, private taskService: TaskService,) {}

  openTaskForm() {
    const dialogRef = this.dialog.open(TaskFormComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Обработка сохраненной задачи
      }
    });
  }
  ngOnInit() {
     this.taskService.getAllTasks().subscribe((res) => {this.tasks = res;});
  }
}

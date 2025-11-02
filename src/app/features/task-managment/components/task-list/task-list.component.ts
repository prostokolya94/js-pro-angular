import {Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../task-form/task-form.component';
import {TaskService} from '../../../../core/services/task.service';
import {Task} from '../../../../shared/models/task/task.model';
import {MatTableDataSource} from '@angular/material/table';
import {MaterialModule} from '../../../../shared/modules/material.module';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../store/page-state';
import {setCurrentPage} from '../../../../store/page-state/page-state.actions';

@Component({
  selector: 'app-task-list',
  standalone: true,
  styleUrls: ['./task-list.component.css'],
  imports: [MaterialModule],
  template: `
    <div class="container">
      <button mat-raised-button color="primary" (click)="openTaskForm()">
        Добавить задачу
      </button>
      <table class="task-table">
        <thead>
        <tr>
          <th>Название</th>
          <th>Описание</th>
          <th>Уровень сложности</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
          @for (task of tasks; track task) {
            <tr>
              <td>{{ task.title }}</td>
              <td>{{ task.description }}</td>
              <td>{{ task.difficultyLevel }}</td>
              <td><button (click)="onTaskDelete(task.id)" >Удалить</button></td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  providers: [TaskService],
})
export class TaskListComponent implements OnInit {
  tasks:Task[] = [
    {
      title: "Задача 1",
      description:"Описание задачи 1",
      id:"1",
      difficultyLevel:2,
      inputExamples: [],
      outputExamples: [],
      tags: []
    }
  ];
  displayedColumns = ['title'];
  tasksDataSource = new MatTableDataSource<Task>(this.tasks);

  constructor(private dialog: MatDialog, private taskService: TaskService, private store: Store<AppState> ) {}

  openTaskForm() {
    const dialogRef = this.dialog.open(TaskFormComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Обработка сохраненной задачи
      }
    });
  }
  ngOnInit() {
     this.taskService.getAllTasks().subscribe((res) => {
       this.tasks = res;
       this.tasksDataSource.data = res;
     });
    this.store.dispatch(setCurrentPage({ page: "task" }));

  }

  onTaskDelete(taskId: string) {
    this.taskService.deleteTask(String(taskId)).subscribe({
      next: () => {
      this.tasksDataSource.data = this.tasksDataSource.data.filter(task => task.id !== taskId);
      this.tasks = this.tasks.filter(task => task.id !== taskId);
      },
      error: () => {
        this.tasksDataSource.data = this.tasksDataSource.data.filter(task => task.id !== taskId);
        this.tasks = this.tasks.filter(task => task.id !== taskId);
      }
    });
  }
}

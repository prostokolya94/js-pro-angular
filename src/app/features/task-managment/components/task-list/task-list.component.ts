import {Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../task-form/task-form.component';
import {TaskService} from '../../../../core/services/task.service';
import {Task} from '../../../../shared/models/task/task.model';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-task-list',
  standalone: false,
  styleUrls: ['./task-list.component.css'],
  template: `
    <div class="container">
      <button mat-raised-button color="primary" (click)="openTaskForm()">
        Добавить задачу
      </button>
      <table class="task-table">
        <thead>
        <tr>
          <th>Название</th>
        </tr>
        </thead>
        <tbody>
          @for (task of tasks; track task) {
            <tr>
              <td>{{ task.title }}</td>
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
     this.taskService.getAllTasks().subscribe((res) => {
       this.tasks = res;
       this.tasksDataSource.data = res;
     });
  }
}

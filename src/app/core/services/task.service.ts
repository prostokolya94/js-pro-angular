import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../../../app/shared/models/task/task.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = `${environment.apiUrl}/tasks`;

  constructor(private http: HttpClient) {}

  getAllTasks() {
    return this.http.get<Task[]>(this.apiUrl);
  }

  createTask(task: Pick<Task, "difficultyLevel" | "description" | "title">) {
    return this.http.post<Task>(this.apiUrl, task);
  }

  updateTask(id: string, task: Partial<Task>) {
    return this.http.patch<Task>(`${this.apiUrl}/${id}`, task);
  }
  deleteTask(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

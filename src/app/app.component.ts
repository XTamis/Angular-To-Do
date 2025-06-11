import { Component } from '@angular/core';
import { TaskService } from './services/task.service';
import { Observable } from 'rxjs';
import { Task } from './models/task';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgForOf, AsyncPipe, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  newTask = '';
  tasks$: Observable<Task[]>;

  constructor(private taskService: TaskService) {
    this.tasks$ = this.taskService.getTasks();
  }

  addTask() {
    const title = this.newTask.trim();
    if (title) {
      this.taskService.addTask({ title, completed: false });
      this.newTask = '';
    }
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id);
  }

  toggleComplete(task: Task) {
    this.taskService.toggleTaskCompletion(task);
  }
}

import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  deleteDoc,
  updateDoc,
  doc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Task } from '../models/task';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasksRef;

  constructor(private firestore: Firestore) {
    this.tasksRef = collection(this.firestore, 'tasks');
  }

  getTasks(): Observable<Task[]> {
    return collectionData(this.tasksRef, { idField: 'id' }) as Observable<Task[]>;
  }

  addTask(task: Task) {
    console.log("Test");
    return addDoc(this.tasksRef, task);
  }

  deleteTask(id: string) {
    const taskDoc = doc(this.firestore, `tasks/${id}`);
    return deleteDoc(taskDoc);
  }

  toggleTaskCompletion(task: Task) {
    const taskDoc = doc(this.firestore, `tasks/${task.id}`);
    return updateDoc(taskDoc, { completed: !task.completed });
  }
}

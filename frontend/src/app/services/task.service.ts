import { WebRequestService } from './web-request.service';
import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private webReqService: WebRequestService) {}

  createList(title: string) {
    // We want to send a web request to create a list
    return this.webReqService.post('lists', { title });
  }

  getLists() {
    return this.webReqService.get('lists');
  }

  updateList(id: string, title: string) {
    return this.webReqService.patch(`lists/${id}`, { title });
  }

  deleteList(id: string) {
    return this.webReqService.delete(`lists/${id}`);
  }

  getTasks(listId: string) {
    return this.webReqService.get(`lists/${listId}/tasks`);
  }

  createTask(listId: string, title: string) {
    return this.webReqService.post(`lists/${listId}/tasks`, { title });
  }

  updateTask(listId: string, id: string, title: string) {
    return this.webReqService.patch(`lists/${listId}/tasks/${id}`, { title });
  }

  deleteTask(listId: string, id: string) {
    return this.webReqService.delete(`lists/${listId}/tasks/${id}`);
  }

  complete(task: Task) {
    return this.webReqService.patch(`lists/${task._listId}/tasks/${task._id}`, {
      completed: !task.completed,
    });
  }
}

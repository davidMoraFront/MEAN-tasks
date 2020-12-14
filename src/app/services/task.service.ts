import { WebRequestService } from './web-request.service';
import { Injectable } from '@angular/core';

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

  getTasks(listId: string) {
    return this.webReqService.get(`lists/${listId}/tasks`);
  }

  createTask(listId: string, title: string) {
    return this.webReqService.post(`lists/${listId}/tasks`, { title });
  }
}
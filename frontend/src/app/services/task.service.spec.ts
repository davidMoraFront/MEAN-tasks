import { TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';

const listStub = {
  _id: '101',
  title: 'new list',
};

const taskStub = {
  _id: '1001',
  _listId: '101',
  title: 'new task',
  completed: false,
};

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // providers: [{ provide: TaskService, useClass: taskStub }],
    });
    service = TestBed.inject(TaskService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});

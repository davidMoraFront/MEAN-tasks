import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { TaskService } from './task.service';
import { WebRequestService } from './web-request.service';

const listStub = {
  "_id":"6000cf8c4eac53c042f2feb3",
  "title": 'list test',
  "_userId":"5fda9ceb393a26a42f2f275f",
  "__v":0
};

const listStubOther = {
  "_id":"6000cf8c4eac53c0425fda9c",
  "title": 'list test',
  "_userId":"5fda9ceb393a26a42f2f275f",
  "__v":0
};

const taskStub = {
  _id: '1001',
  _listId: '101',
  title: 'new task',
  completed: false,
};

const mockLists = [{"_id":"6000cf8c4eac53c029515601","title":"new list","_userId":"5fda9ceb393a26a42f2f275f","__v":0},{"_id":"60129f7cd0f6238906b96247","title":"other list","_userId":"5fda9ceb393a26a42f2f275f","__v":0}]

describe('TaskService', () => {
  let service: TaskService;
  let taskServiceSpy: jasmine.SpyObj<WebRequestService>;
  // let taskServiceSpyTask: jasmine.SpyObj<TaskService>;

  beforeEach(() => {

    const spyWebRequestService = jasmine.createSpyObj('WebRequestService', ['get', 'post', 'patch', 'delete']);
    // const spyTask = jasmine.createSpyObj('TaskService', ['createList']);

    const taskServiceStub = () => ({
      getLists: () => ({ subscribe: (f) => f({ mockLists }) }),
      getTasks: () => ({ subscribe: (f) => f({ }) }),
      createList: () => ({ subscribe: (f) => f({ mockLists }) }),
      deleteList: () => ({ subscribe: (f) => f({ mockLists }) })
    });

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService, {provide: WebRequestService, useValue: spyWebRequestService}]
      // providers: [{provide: TaskService, useValue: spyTask}]
      // providers: [{ provide: TaskService, useValue: taskServiceStub }],
    });
    service = TestBed.inject(TaskService);
    taskServiceSpy = TestBed.inject(WebRequestService) as jasmine.SpyObj<WebRequestService>;
    // taskServiceSpyTask = TestBed.inject(TaskService) as jasmine.SpyObj<TaskService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get lists', () => {
    const stubValue = mockLists;
    taskServiceSpy.get.and.returnValue(of(stubValue));
    expect(stubValue.length).toBeGreaterThan(0);
  });

  it('should create a list', fakeAsync(() => {
    const stubValue = mockLists;
    const stubValueLength = stubValue.length;
    taskServiceSpy.post.and.returnValue(of(stubValue.push(listStub)));
    tick();
    expect(stubValue.length).toEqual(stubValueLength + 1);
  }));

  it('should update a list', fakeAsync(() => {
    const stubValue = mockLists;
    taskServiceSpy.post.and.returnValue(of(stubValue.push(listStubOther)));
    const stubValueLength = stubValue.length;
    taskServiceSpy.patch.and.returnValue(of(stubValue[stubValueLength - 1].title = 'new list test'));
    tick();
    expect(stubValue[stubValueLength - 1].title).toEqual('new list test');
  }));

  it('should delete a list', fakeAsync(() => {
    const stubValue = mockLists;
    const stubValueLength = stubValue.length;
    taskServiceSpy.delete.and.returnValue(of(stubValue.pop()));
    tick();
    expect(stubValue.length).toEqual(stubValueLength - 1);
  }));

});

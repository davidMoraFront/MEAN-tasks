import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/services/auth.service';
import { TaskService } from 'src/app/services/task.service';
import { ListsComponent } from './lists.component';

const mock = [
  {_id: "6000cf8c4eac53c029515601", title: "new list"},
  {_id: "60129f7cd0f6238906b96247", title: "other list"}
];

const mockTask = {
  "_id": "6000cfa04eac53c029515602",
  "_listId": "6000cf8c4eac53c029515601",
  "title": "new task", 
  "completed": false
}

const taskServiceMock = [
  {
    "_id":"6000cf8c4eac53c029515601",
    "title":"new list",
    "_userId":"5fda9ceb393a26a42f2f275f",
    "__v":0
  },
  {
    "_id":"60129f7cd0f6238906b96247",
    "title":"other list",
    "_userId":"5fda9ceb393a26a42f2f275f",
    "__v":0
  }
]

describe('ListsComponent', () => {
  let component: ListsComponent;
  let fixture: ComponentFixture<ListsComponent>;

  beforeEach(async () => {

    TestBed.configureTestingModule({
      declarations: [ ListsComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [TaskService, AuthService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should show data list of listId`,fakeAsync( () => {
    component.loadData('6000cf8c4eac53c029515601');
    tick();
    expect(component.listIdActive).toEqual('6000cf8c4eac53c029515601');
  }));

  it('should show all lists', fakeAsync(() => {
    const taskServiceStub: TaskService = fixture.debugElement.injector.get(TaskService);
    spyOn(taskServiceStub, 'getLists').and.callThrough();
    component.loadData('6000cf8c4eac53c029515601');
    tick();
    expect(taskServiceStub.getLists).toHaveBeenCalled();
  }));

  it(`should show the completed task`, fakeAsync(() => {
    const taskServiceStub: TaskService = fixture.debugElement.injector.get(TaskService);
    spyOn(taskServiceStub, 'complete').and.callThrough();
    component.isCompleted(mockTask);
    tick();
    expect(taskServiceStub.complete).toHaveBeenCalled();
  }));

  it(`should delete list`, fakeAsync(() => {
    const taskServiceStub: TaskService = fixture.debugElement.injector.get(TaskService);
    spyOn(taskServiceStub, 'deleteList').and.callThrough();
    component.deleteList('60129f7cd0f6238906b96247');
    tick();
    expect(taskServiceStub.deleteList).toHaveBeenCalled();
    expect(component.listIdActive).toEqual('');
  }));

  it(`should show data tasks of listId`, fakeAsync(() => {
    const taskServiceStub: TaskService = fixture.debugElement.injector.get(TaskService);
    spyOn(taskServiceStub, 'getTasks').and.callThrough();
    component.loadData('6000cf8c4eac53c029515601')
    tick();
    expect(taskServiceStub.getTasks).toHaveBeenCalled();
  }));

  it(`should delete task of a list`, fakeAsync(() => {
    const taskServiceStub: TaskService = fixture.debugElement.injector.get(TaskService);
    spyOn(taskServiceStub, 'deleteTask').and.callThrough();
    component.deleteTask('603d80ceae8431bf4b537221');
    tick();
    expect(taskServiceStub.deleteTask).toHaveBeenCalled();
  }));

  it(`should open modal with new option`, () => {
    component.open('newList');
    expect(component.optionActive).toEqual('newList');
  });

  it(`should open modal with edit option`, () => {
    component.listIdActive = '6000cf8c4eac53c029515601';
    component.open('editList', '6000cf8c4eac53c029515601');
    expect(component.optionActive).toEqual('editList');
  });

  it(`should do logout`, () => {
    component.logout();
    expect(true);
  });
});

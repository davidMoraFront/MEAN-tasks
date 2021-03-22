import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalOptionsComponent } from './modal-options.component';

describe('ModalOptionsComponent', () => {
  let component: ModalOptionsComponent;
  let fixture: ComponentFixture<ModalOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalOptionsComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a list and destroy subscription', () => {
    component.option = 'newList';
    component.ngOnChanges();
    component.switchOption('other list test');
    component.ngDestroy();
    expect(component.titleModal).toEqual('New List');
  });

  it('should edit list', () => {
    component.option = 'editList';
    component.ngOnChanges();
    component.switchOption('other list');
    expect(component.titleModal).toEqual('Edit List');
  });

  it('should create a task', () => {
    component.option = 'newTask';
    component.ngOnChanges();
    component.switchOption('other task test');
    expect(component.titleModal).toEqual('New Task');
  });

  it('should edit list', () => {
    component.option = 'editTask';
    component.ngOnChanges();
    component.switchOption('new task');
    expect(component.titleModal).toEqual('Edit Task');
  });

});

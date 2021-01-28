import { Subscription } from 'rxjs/internal/Subscription';
import { ModalService } from './service/modal.service';
import { TaskService } from './../../services/task.service';
import {
  Component,
  OnInit,
  Input,
  OnChanges,
  Output,
  EventEmitter,
  Renderer2,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal-options',
  templateUrl: './modal-options.component.html',
  styleUrls: ['./modal-options.component.scss'],
})
export class ModalOptionsComponent implements OnInit, OnChanges {
  @ViewChild('titleInput') titleInput: ElementRef;
  @Input() option: string;
  @Input() listId: string;
  @Input() taskId: string;
  @Output() res: EventEmitter<string> = new EventEmitter();
  cancelButton: string = 'Cancel';
  saveButton: string = 'Save';
  placeholder: string = '';
  titleModal: string = '';
  display$: Observable<'open' | 'close'>;
  private subs: Subscription;

  constructor(
    private taskService: TaskService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.display$ = this.modalService.watch();
    this.showOption(this.option);
  }

  ngDestroy() {
    this.subs.unsubscribe();
  }

  close() {
    this.titleInput.nativeElement.value = '';
    this.modalService.close();
  }

  newList(title: string) {
    this.subs = this.taskService
      .createList(title)
      .subscribe((response: any) => console.log(response));
  }

  editList(title: string) {
    this.subs = this.taskService
      .updateList(this.listId, title)
      .subscribe((response: any) => console.log(response));
  }

  newTask(title: string) {
    console.log(this.listId);
    this.subs = this.taskService
      .createTask(this.listId, title)
      .subscribe((response: any) => console.log(response));
  }

  editTask(id: string, title: string) {
    this.subs = this.taskService
      .updateTask(this.listId, id, title)
      .subscribe((response: any) => console.log(response));
  }

  showOption(option: string): void {
    switch (option) {
      case 'newList': {
        this.titleModal = 'New List';
        this.placeholder = 'Enter list name';
        break;
      }
      case 'editList': {
        this.titleModal = 'Edit List';
        this.placeholder = 'Enter list name';
        break;
      }
      case 'newTask': {
        this.titleModal = 'New Task';
        this.placeholder = 'Enter task name';
        break;
      }
      case 'editTask': {
        this.titleModal = 'Edit Task';
        this.placeholder = 'Enter task name';
        break;
      }
    }
  }

  switchOption(title: string) {
    switch (this.option) {
      case 'newList': {
        this.newList(title);
        break;
      }
      case 'editList': {
        this.editList(title);
        break;
      }
      case 'newTask': {
        this.newTask(title);
        break;
      }
      case 'editTask': {
        this.editTask(this.taskId, title);
        break;
      }
    }
    this.res.emit(this.listId);
    this.close();
  }
}

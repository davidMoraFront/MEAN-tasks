import { Task } from './../../models/task.model';
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
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Observable } from 'rxjs';
import { List } from 'src/app/models/list.model';

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
    if (this.titleInput) this.titleInput.nativeElement.value = '';
    this.modalService.close();
  }

  newList(title: string) {
    this.subs = this.taskService
      .createList(title)
      .subscribe((response: List) => this.res.emit(response._id));
  }

  editList(title: string) {
    this.subs = this.taskService
      .updateList(this.listId, title)
      .subscribe(() => this.res.emit(this.listId));
  }

  newTask(title: string) {
    console.log(this.listId);
    this.subs = this.taskService
      .createTask(this.listId, title)
      .subscribe((response: Task) => this.res.emit(response._listId));
  }

  editTask(id: string, title: string) {
    this.subs = this.taskService
      .updateTask(this.listId, id, title)
      .subscribe(() => this.res.emit(this.listId));
  }

  showOption(option: string): void {
    switch (option) {
      case 'newList': {
        this.titleModal = 'New List';
        break;
      }
      case 'editList': {
        this.titleModal = 'Edit List';
        break;
      }
      case 'newTask': {
        this.titleModal = 'New Task';
        break;
      }
      case 'editTask': {
        this.titleModal = 'Edit Task';
        break;
      }
    }
    this.placeholder = 'Enter name';
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
    this.close();
  }
}

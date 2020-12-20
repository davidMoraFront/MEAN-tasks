import { ModalService } from './../modal-options/service/modal.service';
import { TaskService } from './../../services/task.service';
import { Component, OnInit } from '@angular/core';
import { List } from 'src/app/models/list.model';
import { Task } from 'src/app/models/task.model';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {
  listsTitle: string = 'LISTS';
  addListButton: string = '+ New List';
  tasksTitle: string = 'TASKS';
  noListSelectedText: string = 'Please select a list from the sidebar';
  noTaskText: string =
    'There are no tasks here! Click the add button to create a new task.';
  list: List;
  task: Task;
  lists: List[];
  tasks: Task[];
  optionActive: string = '';
  listIdActive: string = '';
  private routeSub: Subscription;

  constructor(
    private taskService: TaskService,
    private modalService: ModalService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.taskService
      .getLists()
      .subscribe((lists: List[]) => (this.lists = lists));
    if (this.route.children.length > 0) {
      this.routeSub = this.route.children[0].params.subscribe(
        (params: Params) => {
          this.listIdActive = params.listId;
          this.taskService
            .getTasks(params.listId)
            .subscribe((tasks: Task[]) => (this.tasks = tasks));
        }
      );
    }
  }

  ngOnDestroy() {
    if (this.routeSub) this.routeSub.unsubscribe();
  }

  loadData(listId: string) {
    setTimeout(
      () => (
        this.taskService
          .getLists()
          .subscribe((lists: List[]) => (this.lists = lists)),
        this.taskService
          .getTasks(listId)
          .subscribe((tasks: Task[]) => (this.tasks = tasks))
      ),
      0
    );
  }

  isCompleted(task: Task): void {
    this.taskService.complete(task).subscribe(() => {
      console.log('Completed successfully');
      task.completed = !task.completed;
    });
  }

  open(option: string) {
    this.optionActive = option;
    this.modalService.open();
  }

  createNewList() {
    this.taskService
      .createList('Testing')
      .subscribe((response: any) => console.log(response));
  }
}

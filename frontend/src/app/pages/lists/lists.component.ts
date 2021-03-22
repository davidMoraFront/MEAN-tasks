import { AuthService } from './../../services/auth.service';
import { ModalService } from './../modal-options/service/modal.service';
import { TaskService } from './../../services/task.service';
import { Component, OnInit } from '@angular/core';
import { List } from 'src/app/models/list.model';
import { Task } from 'src/app/models/task.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  editText: string = 'Edit';
  deleteText: string = 'Delete';
  list: List;
  task: Task;
  lists: List[];
  tasks: Task[];
  optionActive: string = '';
  listIdActive: string = '';
  taskIdSelected: string = '';
  private routeSub: Subscription;

  constructor(
    private taskService: TaskService,
    private modalService: ModalService,
    private route: ActivatedRoute,
    private authService: AuthService,
    public router: Router
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
    this.listIdActive = listId;
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
    this.taskService.complete(task).subscribe(() => task.completed = !task.completed);
  }

  open(option: string, id?: string) {
    // event.stopPropagation();
    this.optionActive = option;
    if (id !== this.listIdActive) this.taskIdSelected = id;
    else this.taskIdSelected = '';
    this.modalService.open();
  }

  deleteList(id: string) {
    this.taskService.deleteList(id).subscribe((response: any) => {
      this.listIdActive = '';
      this.taskService
        .getLists()
        .subscribe((lists: List[]) => {
          this.lists = lists;
          this.tasks = null;
        });
    });
  }

  deleteTask(id: string) {
    this.taskService
      .deleteTask(this.listIdActive, id)
      .subscribe((response: any) => this.tasks = this.tasks.filter((task) => task._id !== id));
  }

  logout() {
    this.authService.logout();
  }
}

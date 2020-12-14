import { ModalOptionsComponent } from './pages/modal-options/modal-options.component';
import { ListsComponent } from './pages/lists/lists.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'lists', pathMatch: 'full' },
  {
    path: 'lists',
    component: ListsComponent,
    children: [
      {
        path: ':listId',
        component: ListsComponent,
        children: [
          {
            path: 'tasks',
            component: ListsComponent,
          },
        ],
      },
    ],
  },
  // { path: 'lists/:listId', component: ListsComponent },
  // { path: 'lists/:listId/tasks', component: ListsComponent },
  // { path: 'new-list', component: ModalOptionsComponent },
  // { path: 'new-list', component: ModalOptionsComponent },
  // { path: 'edit-list/:id', component: ModalOptionsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

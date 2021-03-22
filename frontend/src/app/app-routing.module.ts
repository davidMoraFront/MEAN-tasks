import { LoginSignupComponent } from './pages/login-signup/login-signup.component';
import { ListsComponent } from './pages/lists/lists.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginSignupComponent },
  { path: 'signup', component: LoginSignupComponent },
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

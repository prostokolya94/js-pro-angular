import {RouterModule, Routes} from '@angular/router';
import {UserListComponent} from './features/user-mangment/components/user-list/user-list.component';
import {UserFormComponent} from './features/user-mangment/components/user-form/user-form.component';
import {TagListComponent} from './features/tag-managment/components/tag-list/tag-list.component';
import {TagFormComponent} from './features/tag-managment/components/tag-form/tag-form.component';
import {TaskListComponent} from './features/task-managment/components/task-list/task-list.component';
import {TaskFormComponent} from './features/task-managment/components/task-form/task-form.component';
import {NgModule} from '@angular/core';

export const routes: Routes = [
  {
    path: 'users',
    component: UserListComponent,
    children: [
      {
        path: ':id/form',
        component: UserFormComponent
      }
    ]
  },
  {
    path: 'tags',
    component: TagListComponent,
    children: [
      {
        path: 'new',
        component: TagFormComponent
      },
      {
        path: ':id/edit',
        component: TagFormComponent
      }
    ]
  },
  {
    path: 'tasks',
    component: TaskListComponent,
    children: [
      {
        path: 'new',
        component: TaskFormComponent
      },
      {
        path: ':id/edit',
        component: TaskFormComponent
      }
    ]
  },
  {
    path: "",
    redirectTo: "tasks",
    pathMatch: "full"
    },
  {
    path: "**",
    redirectTo: "tasks",
    pathMatch: "full"
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

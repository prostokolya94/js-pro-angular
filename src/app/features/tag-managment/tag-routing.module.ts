import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TagListComponent } from './components/tag-list/tag-list.component';
import { TagFormComponent } from './components/tag-form/tag-form.component';

const routes: Routes = [
  {
    path: '',
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TagRoutingModule { }

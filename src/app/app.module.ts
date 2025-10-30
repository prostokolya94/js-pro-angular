import {NgModule} from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {BrowserModule} from '@angular/platform-browser';
import { UserListComponent } from './features/user-mangment/components/user-list/user-list.component';
import {UserFormComponent} from './features/user-mangment/components/user-form/user-form.component';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatFormField, MatOption, MatSelect} from '@angular/material/select';
import {
  MatCell, MatCellDef, MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable, MatTableModule
} from '@angular/material/table';
import {TaskFormComponent} from './features/task-managment/components/task-form/task-form.component';
import {TaskListComponent} from './features/task-managment/components/task-list/task-list.component';
import {TagFormComponent} from './features/tag-managment/components/tag-form/tag-form.component';
import {TagListComponent} from './features/tag-managment/components/tag-list/tag-list.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {RouterOutlet} from "@angular/router";
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app.routes';

@NgModule({
  declarations: [
    UserListComponent,
    UserFormComponent,
    TaskFormComponent,
    TaskListComponent,
    TagFormComponent,
    TagListComponent
  ],
    imports: [
      HttpClientModule,
        BrowserModule,
        MatDialogModule,
        MatCard,
        MatCardHeader,
        MatCardContent,
        MatFormField,
        MatSelect,
        MatOption,
        MatCardActions,
        MatTable,
        MatHeaderCell,
        MatCell,
        MatHeaderRow,
        MatRow,
        ReactiveFormsModule,
        MatButton,
        MatInput,
        MatRowDef,
        MatHeaderRowDef,
        MatCellDef,
        MatHeaderCellDef,
        MatColumnDef,
        MatFormFieldModule,
        MatCardTitle,
        RouterOutlet,
        AppRoutingModule,
        MatTableModule,
        MatButtonModule
    ],
})
export class AppModule { }

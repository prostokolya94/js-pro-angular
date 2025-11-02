import {Component, NgModule, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from '../user-form/user-form.component';
import {User} from '../../../../shared/models/user/user.model';
import {UserService} from '../../../../core/services/user.service';
import {MaterialModule} from '../../../../shared/modules/material.module';
import {setCurrentPage} from '../../../../store/page-state/page-state.actions';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../store/page-state';


@Component({
  standalone: true,
  selector: 'app-user-list',
  imports: [MaterialModule],
  template: `
    <div class="container">
      <button mat-raised-button color="primary" (click)="openUserForm()">
        Добавить пользователя
      </button>
      <mat-table [dataSource]="users">
        <ng-container matColumnDef="username">
          <mat-header-cell *matHeaderCellDef>Имя пользователя</mat-header-cell>
          <mat-cell *matCellDef="let user">{{ user.username }}</mat-cell>
        </ng-container>

        <mat-header-row *matHeaderRowDef="columns"></mat-header-row>
        <mat-row *matRowDef="let row; columns: columns;"
                (click)="openRoleForm(row)">
        </mat-row>
      </mat-table>
    </div>
  `
})
export class UserListComponent implements OnInit {
  users:User[] = [];
  columns = ['username'];

  constructor(private dialog: MatDialog, private userService: UserService, private store: Store<AppState>) {

  }

  openUserForm() {
    const dialogRef = this.dialog.open(UserFormComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Обработка сохраненного пользователя
      }
    });
  }

  openRoleForm(user: User) {
    const dialogRef = this.dialog.open(UserFormComponent, {
      data: user
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Обработка обновленных ролей
      }
    });
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(user => {
      this.users = user
    });
    this.store.dispatch(setCurrentPage({ page: "user" }));

  }
}

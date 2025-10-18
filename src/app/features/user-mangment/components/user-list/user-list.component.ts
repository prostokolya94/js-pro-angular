import {Component, NgModule, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from '../user-form/user-form.component';
import {User} from '../../../../shared/models/user/user.model';
import {UserService} from '../../../../core/services/user.service';


@Component({
  standalone: false,
  selector: 'app-user-list',
  template: `
    <div class="container">
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
      <router-outlet></router-outlet>
    </div>
  `
})
export class UserListComponent implements OnInit {
  users:User[] = [];
  columns = ['username'];

  constructor(private dialog: MatDialog, private userService: UserService,) {

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
  }
}

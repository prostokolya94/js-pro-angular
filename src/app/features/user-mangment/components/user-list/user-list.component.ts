import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserRoleFormComponent } from '../user-role-form/user-role-form.component';

@Component({
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
    </div>
  `
})
export class UserListComponent implements OnInit {
  users = [];
  columns = ['username'];

  constructor(private dialog: MatDialog) {}

  openRoleForm(user: User) {
    const dialogRef = this.dialog.open(UserRoleFormComponent, {
      data: user
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Обработка обновленных ролей
      }
    });
  }
}

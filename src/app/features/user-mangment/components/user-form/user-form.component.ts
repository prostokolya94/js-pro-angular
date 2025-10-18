import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-user-form',
  standalone: false,
  template: `
    <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
      <mat-card>
        <mat-card-header>
          <mat-card-title>{{ isEditMode ? 'Редактирование ролей пользователя' : 'Назначение ролей' }}</mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <mat-form-field appearance="fill">
            <mat-label>Пользователь</mat-label>
            <input matInput formControlName="username" readonly>
          </mat-form-field>

          <mat-form-field appearance="fill">
            <mat-label>Email</mat-label>
            <input matInput formControlName="email" readonly>
          </mat-form-field>

          <mat-form-field appearance="fill">
            <mat-label>Роли</mat-label>
            <mat-select formControlName="roles" multiple>
              @for (role of availableRoles; track role.value) {
                <mat-option [value]="role.value">
                  {{ role.viewValue }}
                </mat-option>
              }
            </mat-select>
            <mat-error>
              @if (roles?.errors?.['required']) {
              Выберите хотя бы одну роль
              }
            </mat-error>
          </mat-form-field>
        </mat-card-content>

        <mat-card-actions align="end">
          <button mat-button color="default" (click)="location.back()">
            Отмена
          </button>
          <button mat-raised-button color="primary" type="submit" [disabled]="!userForm.valid">
            Сохранить
          </button>
        </mat-card-actions>
      </mat-card>
    </form>
  `
})
export class UserFormComponent implements OnInit {
  userForm = new FormGroup({
    username: new FormControl({ value: '', disabled: true }),
    email: new FormControl({ value: '', disabled: true }),
    roles: new FormControl([], Validators.required)
  });

  isEditMode = false;
  availableRoles = [
    { value: 'admin', viewValue: 'Администратор' },
    { value: 'moderator', viewValue: 'Модератор' },
    { value: 'user', viewValue: 'Пользователь' }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar,
    protected location: Location
  ) {}

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.isEditMode = true;
      this.userService.getUser(userId).subscribe(user => {
        this.userForm.patchValue({
          username: user.username,
          email: user.email,
          roles: user.roles as never[]
        });
      });
    }
  }

  onSubmit() {
    if (this.userForm.invalid) return;

    const userId = this.route.snapshot.paramMap.get('id');
    const roles = this.userForm.get('roles')?.value;

    this.userService.updateUserRoles(userId!, roles!).subscribe({
      next: () => {
        this.snackBar.open('Роли успешно обновлены', 'Закрыть', {
          duration: 3000
        });
        this.location.back();
      },
      error: (error) => {
        this.snackBar.open(`Ошибка: ${error.error.message || 'Неизвестная ошибка'}`, 'Закрыть', {
          duration: 5000
        });
      }
    });
  }

  get username() { return this.userForm.get('username'); }
  get email() { return this.userForm.get('email'); }
  get roles() { return this.userForm.get('roles'); }
}

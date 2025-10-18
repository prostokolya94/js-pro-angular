import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import {TagService} from '../../../../core/services/tag.service';

@Component({
  selector: 'app-tag-form',
  standalone: false,
  template: `
    <form [formGroup]="tagForm" (ngSubmit)="onSubmit()">
      <mat-card>
        <mat-card-header>
          <mat-card-title>{{ isEditMode ? 'Редактирование тега' : 'Создание нового тега' }}</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <mat-form-field appearance="fill">
            <mat-label>Название тега *</mat-label>
            <input matInput formControlName="name" required>
          </mat-form-field>
          <mat-form-field appearance="fill">
            <mat-label>Описание</mat-label>
            <textarea matInput formControlName="description"></textarea>
          </mat-form-field>
        </mat-card-content>

        <mat-card-actions align="end">
          <button mat-button color="default" (click)="location.back()">
            Отмена
          </button>
          <button mat-raised-button color="primary" type="submit">
            Сохранить
          </button>
        </mat-card-actions>
      </mat-card>
    </form>
  `
})
export class TagFormComponent implements OnInit {
  tagForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('')
  });

  isEditMode = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tagService: TagService,
    private snackBar: MatSnackBar,
    protected location: Location
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.tagService.getTag(id).subscribe(tag => {
        this.tagForm.setValue({
          name: tag.name || null,
          description: tag.description || ''
        });
      });
    }
  }

  onSubmit() {
    if (this.tagForm.invalid) return;

    const request$ = this.isEditMode
      ? this.tagService.updateTag(
        this.route.snapshot.paramMap.get('id')!,
        this.tagForm.value
      )
      : this.tagService.createTag(this.tagForm.value);

    request$.subscribe({
      next: () => {
        this.snackBar.open('Тег успешно сохранен', 'Закрыть', {
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

  protected readonly name = name;
}

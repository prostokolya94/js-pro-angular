import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TagFormComponent } from '../tag-form/tag-form.component';

@Component({
  selector: 'app-tag-list',
  template: `
    <div class="container">
      <button mat-raised-button color="primary" (click)="openTagForm()">
        Добавить тег
      </button>

      <mat-table [dataSource]="tags">
        <ng-container matColumnDef="name">
          <mat-header-cell *matHeaderCellDef>Имя</mat-header-cell>
          <mat-cell *matCellDef="let tag">{{ tag.name }}</mat-cell>
        </ng-container>

        <mat-header-row *matHeaderRowDef="columns"></mat-header-row>
        <mat-row *matRowDef="let row; columns: columns;"></mat-row>
      </mat-table>
    </div>
  `
})
export class TagListComponent implements OnInit {
  tags = [];
  columns = ['name'];

  constructor(private dialog: MatDialog) {}

  openTagForm() {
    const dialogRef = this.dialog.open(TagFormComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Обработка сохраненного тега
      }
    });
  }
}

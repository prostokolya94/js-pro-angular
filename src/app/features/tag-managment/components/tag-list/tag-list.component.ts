import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TagFormComponent } from '../tag-form/tag-form.component';
import {Tag} from '../../../../shared/models/tag/tag.model';

@Component({
  selector: 'app-tag-list',
  standalone: false,
  styleUrls: ['./tag-list.component.css'],
  template: `
    <div class="container">
      <button mat-raised-button color="primary" (click)="openTagForm()">
        Добавить тег
      </button>

      <table class="tag-table">
        <thead>
        <tr>
          <th>Имя</th>
        </tr>
        </thead>
        <tbody>
          @for (tag of tags; track tag) {
            <tr>
              <td>{{ tag.name }}</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `
})
export class TagListComponent implements OnInit {
  tags:Tag[] = [{id: "1", name: 'tag1', description: "description1"}, {id: "2", name: 'tag2', description: "description2"}];
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
  ngOnInit() {
    console.log("ngOnInit");
  }
}

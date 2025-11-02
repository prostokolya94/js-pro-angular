import { Component, signal } from '@angular/core';
import {RouterModule, RouterOutlet} from '@angular/router';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {MaterialModule} from './shared/modules/material.module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, RouterModule, MaterialModule],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('js-pro-angular');
}

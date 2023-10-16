import { Component, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    HeaderComponent
  ],
  template: `
    <app-header/>
    <div class="container p-5">
      <!-- <p>Counter: {{ counter() }}</p>
      <br>
      <button (click)="increment()" class="bg-gray-500 p-2 rounded-lg me-3">Increment</button>
      <button (click)="decrement()" class="bg-gray-500 p-2 rounded-lg">Decrement</button>
      <br>
      <ul>
        <li *ngFor="let action of actions()">
          {{action}}
        </li>
      </ul> -->
      <router-outlet/>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng16-app';

  counter = signal<number>(0);
  actions = signal<string[]>([]);

  increment() {
    this.counter.update(() => this.counter() + 1);
    this.counter.set(this.counter() + 2);

    this.actions.mutate((action) => action.push('INCREMENT'));
  }
  
  decrement() {
    this.counter.update(() => this.counter() - 1);
    this.actions.mutate((action) => action.push('DECREMENT'));
  }

}

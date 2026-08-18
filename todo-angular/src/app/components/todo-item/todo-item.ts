import { Component, input, output } from '@angular/core';
import { Todo } from '../../models/todo';

@Component({
  selector: 'app-todo-item',
  imports: [],
  templateUrl: './todo-item.html',
  styleUrl: './todo-item.css',
})
export class TodoItem {
  readonly todo = input.required<Todo>();
  readonly todoToggled = output<number>();
  readonly todoRemoved = output<number>();
}

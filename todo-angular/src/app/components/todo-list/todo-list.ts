import { Component, input, output } from '@angular/core';
import { Todo, TodoEdit } from '../../models/todo';
import { TodoItem } from '../todo-item/todo-item';

@Component({
  selector: 'app-todo-list',
  imports: [TodoItem],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
})
export class TodoList {
  readonly todos = input.required<Todo[]>();
  readonly todoToggled = output<number>();
  readonly todoRemoved = output<number>();
  readonly todoEdited = output<TodoEdit>();
}
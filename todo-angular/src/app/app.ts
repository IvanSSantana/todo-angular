import { Component, inject } from '@angular/core';
import { TodoForm } from './components/todo-form/todo-form';
import { TodoList } from './components/todo-list/todo-list';
import { TodoStore } from './services/todo-store';

@Component({
  selector: 'app-root',
  imports: [TodoForm, TodoList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  readonly store = inject(TodoStore);
}

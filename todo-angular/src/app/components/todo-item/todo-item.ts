import { Component, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Todo, TodoEdit } from '../../models/todo';

@Component({
  selector: 'app-todo-item',
  imports: [FormsModule],
  templateUrl: './todo-item.html',
  styleUrl: './todo-item.css',
})
export class TodoItem {
  readonly todo = input.required<Todo>();
  readonly todoToggled = output<number>();
  readonly todoRemoved = output<number>();
  readonly todoEdited = output<TodoEdit>();

  readonly editing = signal(false);
  editTitle = '';

  startEdit(): void {
    this.editTitle = this.todo().title;
    this.editing.set(true);
  }

  cancelEdit(): void {
    this.editing.set(false);
    this.editTitle = '';
  }

  saveEdit(): void {
    const normalizedTitle = this.editTitle.trim(); 

    if (!normalizedTitle) return;

    this.todoEdited.emit({
      id: this.todo().id,
      title: normalizedTitle,
    });

    this.editing.set(false);
    this.editTitle = '';
  }
}
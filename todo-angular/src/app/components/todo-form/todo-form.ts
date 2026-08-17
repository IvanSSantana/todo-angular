import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  imports: [FormsModule],
  templateUrl: './todo-form.html',
  styleUrl: './todo-form.css',
})
export class TodoForm {
  readonly todoAdded = output<string>();
  title = '';

  submit(): void {
    const normalizedTitle = this.title.trim();

    if (!normalizedTitle) {
      return;
    }

    this.todoAdded.emit(normalizedTitle);
    this.title = '';
  }
}
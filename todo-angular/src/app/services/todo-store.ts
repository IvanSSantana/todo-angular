import { computed, signal, Injectable } from '@angular/core';
import { Todo, TodoEdit, TodoFilter } from '../models/todo';
2
@Injectable({
  providedIn: 'root',
})
export class TodoStore {
  private readonly storageKey = 'todos-angular';
  private readonly todosState = signal<Todo[]>(this.loadTodos());
  private readonly filterState = signal<TodoFilter>('todas');

  readonly todos = this.todosState.asReadonly();
  readonly filter = this.filterState.asReadonly();

  readonly total = computed(() => this.todosState().length);
  readonly completed = computed(
    () => this.todosState().filter((todo) => todo.completed).length 
  );
  readonly pending = computed(() => this.total() - this.completed());

  readonly filteredTodos = computed(() => {
    const todos = this.todosState();
    const filter = this.filterState();

    if (filter === 'pendentes')
      return todos.filter((todo) => !todo.completed);

    if (filter === 'concluidas')
      return todos.filter((todo) => !!todo.completed);

    return todos;
  });

  setFilter(filter: TodoFilter): void {
    this.filterState.set(filter);
  }

  add(title: string): void {
    const normalizedTitle = title.trim();

    if (!normalizedTitle) return;

    const newTodo: Todo = {
      id: Date.now(),
      title: normalizedTitle,
      completed: false
    };

    this.updateTodos([...this.todosState(), newTodo]);
  };

  toggle(id: number): void {
    const updatedTodos = this.todosState().map((todo) => 
      todo.id === id ? {...todo, completed: !todo.completed} : todo
    );

    this.updateTodos(updatedTodos);
  };

  remove(id: number): void {
    const updatedTodos = this.todosState().filter((todo) => todo.id != id);
    this.updateTodos(updatedTodos);
  };

  clearCompleted(): void {
    const updatedTodos = this.todosState().filter((todo) => !todo.completed);
    this.updateTodos(updatedTodos);
  };

  editTitle(edit: TodoEdit): void {
    const normalizedTitle = edit.title.trim();

    if (!normalizedTitle) {
      return;
    }

    const updatedTodos = this.todosState().map((todo) =>
      todo.id === edit.id
        ? { ...todo, title: normalizedTitle }
        : todo,
    );

    this.updateTodos(updatedTodos);
  }

  private updateTodos(todos: Todo[]) : void {
    this.todosState.set(todos);
    localStorage.setItem(this.storageKey, JSON.stringify(todos));
  }

  private loadTodos(): Todo[] {
    const savedTodos = localStorage.getItem(this.storageKey);

    if (!savedTodos) return [];

    try {
      return JSON.parse(savedTodos) as Todo[];
    } catch {
      localStorage.removeItem(this.storageKey);
      return [];
    };
  };
}

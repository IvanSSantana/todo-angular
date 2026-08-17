import { Component, signal } from '@angular/core';
import { TodoForm } from './components/todo-form/todo-form';

@Component({
  selector: 'app-root',
  imports: [TodoForm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  ultimaTarefa = '';

  showTitle(title: string) : void {
    this.ultimaTarefa = title;
    console.log('Tarefa recebida do componente filho: ', title);
  };
};

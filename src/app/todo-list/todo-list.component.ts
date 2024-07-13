import {Component, OnInit} from '@angular/core';
import {TodoItem} from "../entities/todoItem";
import {MatCard, MatCardContent, MatCardFooter, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {AsyncPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {Observable} from "rxjs";
import {TodoServiceService} from "../_services/todo-service.service";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatFabButton, MatMiniFabButton} from "@angular/material/button";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    NgClass,
    NgIf,
    NgForOf,
    AsyncPipe,
    MatCardFooter,
    MatFormField,
    MatInput,
    MatIcon,
    MatFabButton,
    FormsModule,
    MatButton,
    MatMiniFabButton
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnInit {
  todoList$: Observable<TodoItem[]>;
  addTodoInputValue: string = '';

  constructor(
    private todoService: TodoServiceService
  ) {
  }

  ngOnInit() {
    this.getTodoList();
  }

  getTodoList() {
    this.todoList$ = this.todoService.getTodoList();
  }

  addTodoItem() {
    if (this.addTodoInputValue === '') {
      return;
    }
    this.todoService.addTodo(this.addTodoInputValue).subscribe(newTodoId => {
      this.addTodoInputValue = '';
      this.getTodoList();
    });
  }

  deleteItem(id:number) {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.getTodoList();
    });
  }
}

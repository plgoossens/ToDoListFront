import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TodoItem} from "../entities/todoItem";
import {environment as env} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {

  constructor(
    private http: HttpClient
  ) { }

  getTodoList(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(
      `${env.backend_endpoint}/todo`,
      {
        headers: {'Access-Control-Allow-Origin': '*'}
      }
    );
  }

  addTodo(content:string): Observable<number> {
    return this.http.post<number>(
      `${env.backend_endpoint}/todo`,
      {
        'content': content
      },
      {
        headers: {'Access-Control-Allow-Origin': '*'}
      }
    );
  }

  deleteTodo(id:number): Observable<null> {
    return this.http.delete<null>(
      `${env.backend_endpoint}/todo/${id}`,
      {
        headers: {'Access-Control-Allow-Origin': '*'}
      }
    );
  }
}

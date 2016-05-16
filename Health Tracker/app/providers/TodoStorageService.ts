
import {Injectable, Inject} from 'angular2/core';
import {Storage, LocalStorage} from 'ionic-angular';
import {Todo} from "../models/Todo";
import {fromJS, List} from 'immutable';
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";

@Injectable()
export class TodoStorageService {

    local = new Storage(LocalStorage);
    _todos: List<Todo> = List<Todo>();  // local cache of todos

    constructor()  {
        // get todos from local storage into local cache
        Observable.fromPromise(this.local.get('todos')
            .then((result) => {
                let todos: Todo[] = (<Object[]>JSON.parse(result)).map((todo: any) =>
                    new Todo({ id: todo.id, description: todo.description, completed: todo.completed }));
                this._todos = List<Todo>(todos);
            }));
    }

    getAllTodos(): Observable<any> {
        // get todos from local storage
        return Observable.fromPromise(this.local.get('todos'));
    }

    saveTodo(newTodo: Todo): Observable<Todo> {
        // set new id if new todo
        console.log("new todo=" + JSON.stringify(newTodo));
        this._todos = this._todos.push(newTodo);
        console.log('save todos=' + JSON.stringify(this._todos));
        this.local.set("todos", JSON.stringify(this._todos));
        return Observable.of(newTodo);
    }

    deleteTodo(deletedTodo: Todo): Observable<Todo> {
        let index = this._todos.findIndex((todo) => todo.id === deletedTodo.id);
        this._todos.delete(index);
        this.local.set("todos", JSON.stringify(this._todos));
        return Observable.of(deletedTodo);
    }

    toggleTodo(toggled: Todo): Observable<Todo> {
        let index = this._todos.findIndex((todo: Todo) => todo.id === toggled.id);
        let todo: Todo = this._todos.get(index);
        this._todos.set(index, new Todo({ id: toggled.id, description: toggled.description, completed: !toggled.completed }));
        this.local.set("todos", JSON.stringify(this._todos));
        return Observable.of(toggled);
    }

}
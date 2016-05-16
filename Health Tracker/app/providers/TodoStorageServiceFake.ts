
import {Injectable,Inject} from 'angular2/core';
import {Todo} from "../models/Todo";
import {List} from 'immutable';
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";


@Injectable()
export class TodoStorageService {

    _todos: List<Todo> = List<Todo>();
    _todos$: Observable<List<Todo>>;
    item1: any = new Todo({
        id: 1, description: "item 1", completed: false
    });
    item2: any = new Todo({
        id: 2, description: "item 2", completed: false
    });
    
    private _todosObserver: Observer<List<Todo>>;

    constructor()  {
        // create fake todo list
        this._todos = this._todos.push(this.item1);
        this._todos = this._todos.push(this.item2);
        // create new Observable
        this._todos$ = Observable.of(this._todos);
    }

    getAllTodos(): Observable<List<Todo>> {
        return this._todos$;
    }

    saveTodo(newTodo: Todo): Observable<Todo> {
        this._todos = this._todos.push(newTodo);
        return Observable.of(newTodo);
    }

    deleteTodo(deletedTodo: Todo): Observable<Todo> {
        return Observable.of(deletedTodo);
    }

    toggleTodo(toggled: Todo): Observable<Todo> {
        return Observable.of(toggled);
        // return this.http.put('/todo', JSON.stringify(toggled.toJS()),{headers}).share();
    }

}
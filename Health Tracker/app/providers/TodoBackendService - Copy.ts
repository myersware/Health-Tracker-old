
import {Injectable,Inject} from 'angular2/core';
import  {Http,Headers,URLSearchParams} from 'angular2/http';
import {Todo} from "../models/Todo";
import {List} from 'immutable';
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";


@Injectable()
export class TodoBackendService {

    http: Http;
    _todos$: Observable<List<Todo>>;
    item1: any = new Todo({
        id: 1, description: "item 1", completed: false
    });
    item2: any = new Todo({
        id: 2, description: "item 2", completed: false
    });
    fakeTodos = List<Todo>();
    private _todosObserver: Observer<Todo[]>;

    constructor(http:Http)  {
        this.http = http;
        // create new Observable
        this._todos$ = new Observable(observer => this._todosObserver = observer).share();
        // create fake todo list
        this.addItem(this.item1);
        this.addItem(this.item2);
    }

    addItem(newTodo: Todo) {
        this.fakeTodos = this.fakeTodos.push(newTodo);
    }

    getAllTodos(): Observable<List<Todo>> {
        return this._todos$;
    }

    saveTodo(newTodo: Todo): Observable<Todo> {
        this.addItem(newTodo);
        return Observable.of(newTodo);
    }

    deleteTodo(deletedTodo: Todo): Observable<Todo> {
        let params = new URLSearchParams();
        params.append('id', '' + deletedTodo.id );
        return Observable.of(deletedTodo);
    }


    toggleTodo(toggled: Todo): Observable<Todo> {
        return Observable.of(toggled);
        // return this.http.put('/todo', JSON.stringify(toggled.toJS()),{headers}).share();
    }

}
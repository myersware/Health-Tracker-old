import {Component, @Inject, Input, Output, EventEmitter} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

@Component({
    selector: 'todo',
    template: `<span (click)="toggle.next()" [style.textDecoration]="textEffect">
               {{text}}
             </span>`
})
class Todo {
    @Input() text: string;
    @Input() completed: boolean;
    @Output() toggle = new EventEmitter();

    get textEffect() { return this.completed ? 'line-through' : 'none'; }
}

@Component({
    selector: 'todo-list',
    template: `<todo *ngFor="#t of filtered|async"
                [text]="t.text" [completed]="t.completed"
                (toggle)="emitToggle(t.id)"></todo>`,
    directives: [Todo]
})
class TodoList {
    constructor( @Inject(dispatcher) private dispatcher: Observer<Action>,
        @Inject(state) private state: Observable<AppState>) { }

    get filtered() { return this.state.map(s => getVisibleTodos(s.todos, s.visibilityFilter)); }

    emitToggle(id) { this.dispatcher.next(new ToggleTodoAction(id)); }
}

var nextId = 0;
@Component({
    selector: 'add-todo',
    template: `<input #text><button (click)="addTodo(text.value)">Add Todo</button>`
})
class AddTodo {
    constructor( @Inject(dispatcher) private dispatcher: Observer<Action>) { }
    addTodo(value) { this.dispatcher.next(new AddTodoAction(nextId++, value)); }
}

@Component({
    selector: 'filter-link',
    template: `<a href="#" (click)="setVisibilityFilter()"
               [style.textDecoration]="textEffect|async"><ng-content></ng-content></a>`
})
class FilterLink {
    @Input() filter: string;
    constructor( @Inject(dispatcher) private dispatcher: Observer<Action>,
        @Inject(state) private state: Observable<AppState>) { }

    get textEffect() { return this.state.map(s => s.visibilityFilter === this.filter ? 'underline' : 'none'); }

    setVisibilityFilter() { this.dispatcher.next(new SetVisibilityFilter(this.filter)); }
}


/// <reference path="../node_modules/immutable/dist/immutable.d.ts" />

import {App, IonicApp, Events, Platform} from 'ionic-angular';
import {Component, provide, Inject} from "angular2/core";
import {HTTP_PROVIDERS} from "angular2/http";
import {Header} from "./components/Header";
import {TodoList} from "./components/TodoList";
import {Todo} from "./models/Todo";
import {Footer} from "./components/Footer";
import {List} from "immutable";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/share';
import {TodoStorageService} from "./providers/TodoStorageService";
import {TodoStore} from "./state/TodoStore";
import {UiStateStore} from "./state/UiStateStore";
import {UiState} from "./state/ui-state";


    @App({
        selector: 'app',
        directives: [Header, TodoList, Footer],
        template: `
        <div>
            <section id="todoapp">

                <todo-header (todo)="onAddTodo($event)"></todo-header>

                <todo-list></todo-list>

                <todo-footer [hidden]="(size | async) === 0" [count]="size | async"></todo-footer>

            </section>
            <footer id="info">
                <p>{{uiStateMessage | async}}</p>
                <p>Add, Remove and Complete TODOs</p>
            </footer>
        </div>
    `,
        providers: [HTTP_PROVIDERS,
            TodoStorageService,
            TodoStore,
            UiStateStore],
        config: {
            platforms: {
                android: {
                    tabbarLayout: 'icon-hide'
                }
            }
        }
    })
class HealthTrackerApp {
    constructor(private todoStore: TodoStore, private uiStateStore: UiStateStore) {

    }

        // size is not refreshing in display :(
    get size() {
        return this.todoStore.todos.map((todos: List<Todo>) => todos.size);
    }

    get uiStateMessage() {
        return this.uiStateStore.uiState.map((uiState: UiState) => uiState.message);
    }


    onAddTodo(description) {
        let newTodo = new Todo({id:Math.random(), description});
        this.uiStateStore.startBackendAction('Saving Todo...');

        this.todoStore.addTodo(newTodo)
            .subscribe(
            res => { this.uiStateStore.endBackendAction();},
                err => {
                    this.uiStateStore.startBackendAction("Save failed...");
                }
            );
    }

}

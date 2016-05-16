import {Injectable, Inject} from 'angular2/core';
import {Storage, LocalStorage, List} from 'ionic-angular';
import {Observable} from "rxjs/Observable";

// -- state
interface Settings {
    calendar: string;
    sheet: string;
    authToken: string;
}

@Injectable()
export class SettingsService {

    storage = new Storage(LocalStorage);

    constructor() {

    }

    get() {
        return Observable.fromPromise(this.storage.get("settings"));
    }

    save(newSettings: Settings): Observable<Settings> {
        console.log('saving localStorage settings=' + JSON.stringify(this._settings));
        return Observable.fromPromise(this.storage.set("settings", JSON.stringify(this._settings)));
    }

}
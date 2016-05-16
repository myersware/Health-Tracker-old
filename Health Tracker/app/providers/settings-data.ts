import {Injectable} from 'angular2/core';
import {Platform, Storage, LocalStorage, Events} from 'ionic-angular';
import {CordovaOauth, Google} from 'ng2-cordova-oauth/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

// declare var gapi: any;

export interface Settings {
    calendar: string;
    sheet: string;
    authToken: string;
}

@Injectable()
export class SettingsService {
    settings$: Observable<Settings>;
    private _settingsObserver: Observer<Settings>;
    private _dataStore: {
        settings: Settings;
    };
    _settings: any = {
        calendar: "Jim Calendar",
        sheet: "Jim Health",
        authToken: null
    };
    _webClientId = "1053640841080-opjjqda6jdr0ocgh539ongqj9kpgur7e.apps.googleusercontent.com";
    _webSecret = "7d2EUEzLZ-phOhjUB5rlgmRG";
    _scopes = "profile email https://www.googleapis.com/auth/drive";
    fingerprint = "83:F8:D5:EB:03:DC:FC:30:30:57:05:70:0C:4E:FD:91:90:AD:4B:A1";
  calendar: string;
  sheet: string;
  public loggedIn: boolean = false;
  cordovaOauth: CordovaOauth;
  platform: Platform;

  storage = new Storage(LocalStorage);

  constructor(platform: Platform, private events: Events) {
      this._dataStore = {settings: {
          calendar: "Jim Calendar",
          sheet: "Jim Health",
          authToken: null
      }};

      this.settings$ = new Observable(observer => this._settingsObserver = observer).share();

      this.cordovaOauth = new CordovaOauth(new Google({
          clientId: this._webClientId,
          appScope: [this._scopes]
      }));
      this.platform = platform;
      this.platform.ready().then(() => {
          this.readFromLocalStorage().subscribe((data) => {
              if (this._settings.authToken) {
                  console.log('using authToken=' + this._settings.authToken);
                  gapi.auth.init(function () {
                      console.log('using authToken=' + this._settings.authToken);
                      gapi.auth.setToken(this._settings.authToken);
                      this.loggedIn = true;
                  });
              } else {
                  console.log("no authToken set");
                  this.cordovaOauth.login().then((success) => {
                      console.log(JSON.stringify(success));
                      this._settings.authToken = success;
                      this.loggedIn = true;
                      gapi.auth.setToken(this._settings.authToken);
                      this.save();
                  }, (error) => {
                      console.log(error);
                      this.loggedIn = false;
                  });
              }
          });
      });
    console.log("SettingsData constructor end");
  }

  load() {
      this._http.get(`${this._baseUrl}/todos/${id}`).map(response => response.json()).subscribe(data => {
          let notFound = true;

          this._dataStore.todos.forEach((item, index) => {
              if (item.id === data.id) {
                  this._dataStore.todos[index] = data;
                  notFound = false;
              }
          });

          if (notFound) {
              this._dataStore.todos.push(data);
          }

          this._todosObserver.next(this._dataStore.todos);
      }, error => console.log('Could not load todo.'));
  }

  login(loginOK) {
      //this.platform.ready().then(() => {
      //    this.cordovaOauth.login().then((success) => {
      //        console.log(JSON.stringify(success));
      //        this._authToken = success["access_token"];
      //        this.loggedIn = true;
      //        loginOK();
      //    }, (error) => {
      //        console.log(error);
      //        this.loggedIn = false;
      //    });
      //});
      loginOK();
  }

  getAuthToken() {
      return this._settings.authToken;
  }

  trySilentLogin() {

  }

  disconnect() {

  }

  logout() {
      this.loggedIn = false;

      this.events.publish('user:logout');
  }

  getSettings() {
      return this._settings;
  }

  setCalendar(value) {
      this._settings.calendar = value;
  }

  setSheet(value) {
      this._settings.sheet = value;
  }

  save() {
      console.log('saving localStorage settings=' + JSON.stringify(this._settings));
    this.storage.set("settings", JSON.stringify(this._settings));
  }
  
  readFromLocalStorage(): any {
      Observable.fromPromise(
          this.storage.get("settings")
              .then((settings) => {
                  if (settings) {
                      this._settings = JSON.parse(settings);
                  }
                  console.log('read localStorage settings=' + JSON.stringify(this._settings));
                  Promise.resolve(this._settings);
              })
      );

      return this._settings;
  }
  
}

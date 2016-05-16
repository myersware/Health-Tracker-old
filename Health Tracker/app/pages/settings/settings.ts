import {Page, NavController} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import {SettingsService, Settings} from '../../providers/settings-data';
import {Observable} from 'rxjs/Observable';
import {LoginPage} from '../login/login';
import {LogOutPage} from '../logout/logout';
import {Control, AbstractControl,
    ControlGroup,
  FORM_DIRECTIVES, FormBuilder, Validators} from 'angular2/common';

@Page({
    selector: 'settings',
    templateUrl: 'build/pages/settings/settings.html',
    directives: [FORM_DIRECTIVES]
})
export class SettingsPage {
    authForm: ControlGroup;
    calendar: AbstractControl;
    sheet: AbstractControl;
    settings: Observable<Settings>;

    validateEmail(c: Control) {
        let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

        return EMAIL_REGEXP.test(c.value) ? null : {
            validateEmail: {
                valid: false
            }
        };
    }

    constructor(private nav: NavController, private _settingsService: SettingsService, fb: FormBuilder) {
        
    }

    ngOnInit() {
        this.settings = this._settingsService.settings$;
        this._settingsService.load();
        console.log('constructing authForm');
        this.authForm = new ControlGroup({
            calendar: new Control(this.settings.calendar, Validators.required),
            sheet: new Control(this.settings.sheet, Validators.required)
        });
        console.log('constructed authForm');
        this.calendar = this.authForm.controls['calendar'];
        this.sheet = this.authForm.controls['sheet'];
    }

    doLogin() {
        this._settingsService.login(function () {
            this.nav.push(TabsPage);
            }
        );
    }

    onSubmit() {
        if (this.authForm.valid) {
            this._settingsService.setCalendar(this.authForm.controls['calendar'].value);
            this._settingsService.setSheet(this.authForm.controls['sheet'].value);
            this._settingsService.save();
        }
    }

    doConnect() {
        this.doLogin();
    }

    doDisconnect() {
        this.doLogout();
    }

    doLogout() {
        this._settingsService.logout();
        this.nav.push(TabsPage);
    }
}
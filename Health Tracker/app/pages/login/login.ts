import {Page, NavController} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import {SettingsData} from '../../providers/settings-data';


@Page({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {

  constructor(private nav: NavController, private settingsData: SettingsData) {
      if (this.settingsData.loggedIn) {
        this.nav.push(TabsPage);    
      }
  }

  doLogin(provider:string){
      this.settingsData.login(function () {
          this.nav.push(TabsPage);
      }
      );
  }
}

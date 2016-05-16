import {Page, NavController} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import {SettingsData} from '../../providers/settings-data';

@Page({
  templateUrl: 'build/pages/logout/logout.html'
})
export class LogOutPage {
  
  constructor(private nav: NavController, private settingsData: SettingsData) {
      this.settingsData.logout();     
      this.nav.push(TabsPage);
    }

  doLogout(provider: string) {
      this.settingsData.logout();
      this.nav.push(TabsPage);
  }
}
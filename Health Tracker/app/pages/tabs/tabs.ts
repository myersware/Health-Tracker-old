import {Page, NavParams} from 'ionic-angular';
import {HistoryPage} from '../history/history';
import {AboutPage} from '../about/about';
import {StatusPage} from '../status/status';
import {SettingsPage} from '../settings/settings';


@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: any = StatusPage;
  tab2Root: any = SettingsPage;
  tab3Root: any = HistoryPage;
  tab4Root: any = AboutPage;
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }
}

import {IonicApp, Page, Alert, NavController, ItemSliding, Events} from 'ionic-angular';
import {HistoryData} from '../../providers/history-data';
import {SettingsData} from '../../providers/settings-data';
import {HistoryDetailPage} from '../history-detail/history-detail';
import {TrackerDay} from '../../components/tracker-day';

@Page({
    templateUrl: 'build/pages/history/history.html',
    directives: [TrackerDay]
})
export class HistoryPage {
  dayIndex = 0;
  history = [];

  constructor(
    private app: IonicApp,
    private nav: NavController,
    private historyData: HistoryData,
    private settings: SettingsData,
    private events: Events
  ) {      
      this.updateHistory();
  }

  onPageDidEnter() {
      this.app.setTitle('History');
  }

  doRefresh(refresher) {
      console.log('Begin async operation', refresher);

      setTimeout(() => {
          console.log('Async operation has ended');
          refresher.complete();
      }, 2000);
  }



  updateHistory() {
      this.historyData.getHistory().then(data => {
          this.history = data;
      });
  }

  goToHistoryDetail(historyData) {
    // go to the session detail page
    // and pass in the session data
      this.nav.push(HistoryDetailPage, historyData);
  }

}

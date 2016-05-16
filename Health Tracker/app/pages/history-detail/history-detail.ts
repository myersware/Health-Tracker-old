import {Page, NavParams} from 'ionic-angular';


@Page({
  templateUrl: 'build/pages/history-detail/history-detail.html'
})
export class HistoryDetailPage {
  session: any;

  constructor(private navParams: NavParams) {
    this.session = navParams.data;
  }
}

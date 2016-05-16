import {Injectable} from "angular2/core";
import {Http} from "angular2/http";
import {SettingsData} from "./settings-data";
import {HealthTrackerApi} from "./health-tracker-api";


@Injectable()
export class HistoryData {
    data: any;
    isDataLoaded: boolean = false;
    apisLoaded: boolean = false;

    constructor(private http: Http, private settings: SettingsData, private tracker: HealthTrackerApi) {
        console.log("hd con start");

        console.log("hd con end");
    }

  load() {
      if (this.settings.loggedIn) {
          this.tracker.callScriptFunction();
          this.data = function () {
              return new Promise((resolve, reject) => {
                  console.log("setting fake history");
                  this.data = {
                      "history": [
                          {
                              "id": 4,
                              "date": "05/10/2016",
                              "comment": "fake data",
                              "weight": 180,
                              "workout": {
                                  "treadmill": {
                                      "distance": 1.25,
                                      "time": "20:25"
                                  },
                                  "rowing": {
                                      "distance": 1.5,
                                      "time": "8:08"
                                  }
                              }
                          }
                      ]
                  };
                  console.log("set fake history");
                  Promise.resolve(this.data);
              });
          };
      } else {
          this.data = function () {
              return new Promise((resolve, reject) => {
                console.log("setting fake history");
                this.data = {
                    "history": [
                        {
                            "id": 4,
                            "date": "05/09/2016",
                            "comment": "not logged in",
                            "weight": 180,
                            "workout": {
                                "treadmill": {
                                    "distance": 1.25,
                                    "time": "20:25"
                                },
                                "rowing": {
                                    "distance": 1.5,
                                    "time": "8:08"
                                }
                            }
                        }
                    ]
                };
                console.log("set fake history");
                Promise.resolve(this.data);
            });
        };
      }
      return this.data;
  }

  processData(data: any) {
    // just some good 'ol JS fun with objects and arrays
      console.log("history-data: data=" + JSON.stringify(data));
    return data;
  }

  processDay(data:any, day:any) {
      ;
  }

  getHistory():any {
      return this.load();
  }

  getRecent():any {
      return this.load();
  }

}

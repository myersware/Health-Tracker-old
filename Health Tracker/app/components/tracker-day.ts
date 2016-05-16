import {IONIC_DIRECTIVES} from 'ionic-angular';
import {Component, Input} from 'angular2/core';
import {ITrackerItemModel} from "../models/TrackerItemModel";

@Component({
    selector: 'tracker-day',
    templateUrl: "build/components/tracker-day.html",
    directives: IONIC_DIRECTIVES
})

export class TrackerDay {
    @Input() item: ITrackerItemModel;
    constructor() {
    }
}
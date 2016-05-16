import {App, IonicApp, Events, Platform} from 'ionic-angular';
import { Component } from 'angular2/core';
import { RocketComponent } from './rocket/rocket.component';

@App({
    template: `<h1>Our rocket...</h1>
    <rocket id='rocket-1'>Rocket 1</rocket>
`,
    directives: [RocketComponent,],
    config: {
        platforms: {
            android: {
                tabbarLayout: 'icon-hide'
            }
        }
    }
})
export class AppComponent {
}

import {Component,ComponentRef,Sam,RocketActions,RocketModel,RocketState,RocketViews,DynamicComponentLoader,ElementRef} from './rocket.exports';
import {Directive, Renderer} from 'angular2/core';
import {NgClass} from 'angular2/common';

@Component({
    selector: 'rocket',
    templateUrl: 'build/pages/rocket/rocket.template.html',
    directives: [NgClass]
})
export class RocketComponent extends Sam<RocketActions, RocketModel, RocketState, RocketViews> {
    private component: ComponentRef;

    constructor(private loader: DynamicComponentLoader, private elementRef: ElementRef) {
        super(RocketActions, RocketModel, RocketState, RocketViews);
        this.actions.init();
    }

    ngOnInit() {
        this.views.updated.subscribe((representation) => {
            // Not sure how efficient this is at replacing the DOM. Gut tells me it's expensive.
            // Could create a single view/template with ngIfs and a ViewModel that it would bind to.
            // ViewModel properties would update based on state
            if (this.component !== undefined) { console.log("comptype=" + this.component.componentType + " rep.name=" + representation.name); }
            if (this.component == undefined || this.component.componentType !== representation.name) {
                this.loader.loadIntoLocation(representation, this.elementRef, 'rocket').then((component) => {
                    if (this.component) {
                        this.component.dispose();
                    }
                    component.instance.rocket = this;
                    this.component = component;
                });
            }
        });

        this.views.updated.subscribe((representation) => {
            if (this.state.launched(this.model)) {
                //jQuery('rocket').find('#rocket_launch').css("margin-bottom", "1000px");
                //jQuery('rocket').find('.cloud_fill').css("animation", "smoke_size .35s infinite");
                //jQuery('rocket').find('.rocket_shadow').css("animation", "shadow_flare .35s infinite");  
                console.log("launching set css");
            }            
        });

        this.views.updated.next(this.views.representation);
    }
}
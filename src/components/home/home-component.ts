import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {json} from 'aurelia-fetch-client';
import {bindable} from 'aurelia-framework';
import $ from 'jquery';
import * as Echarts from 'echarts';
import {EventAggregator} from 'aurelia-event-aggregator';
import {PLATFORM} from 'aurelia-pal';
import 'jstree';


@inject(HttpClient, Echarts, EventAggregator)
export class HomeComponent {

  constructor(http, Echarts, EventAggregator) {

  }
}

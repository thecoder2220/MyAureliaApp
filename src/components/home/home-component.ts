import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {json} from 'aurelia-fetch-client';
import {bindable} from 'aurelia-framework';
import $ from 'jquery';
import {EventAggregator} from 'aurelia-event-aggregator';
import {PLATFORM} from 'aurelia-pal';
import 'jstree';
import {WebAPI} from '../../web-api';


@inject(HttpClient, WebAPI, EventAggregator )
export class HomeComponent {
  views = ['Agrégée', 'Pièce', 'Qualité'];
  @bindable currentView = "Agrégée";
  @bindable config = {
    pageSize: 5,
    totalItems: 0
  };
  @bindable currentPage = 1;
  @bindable achatsStatsReady = true;
  @bindable achatsStats = [];
  contacts;

  constructor(http, private api: WebAPI, ea: EventAggregator) {

  }

  // cette méthode est en fait exécutée
  created() {
    console.log("methode created dans classe Home Component exécutée ")
    this.api.getContactList().then(contacts => this.contacts = contacts);
    this.api.getContactListCount().then(total => this.config.totalItems = total);
  }

  setPage(num) {
    if (this.currentPage + num >= 1) this.currentPage += num;
  };

  /* ******************************************************************************************************************** */
  /* ********************************************** Tableau Agrégé/Qualité ********************************************** */
  /* ******************************************************************************************************************** */

/*  loadAchatsStats() {
    this.achatsStats = [];
    this.achatsStatsReady = false;

  };*/

  currentPageChanged(newValue, oldValue) {
    //if (newValue != oldValue) this.loadAchatsStats()
  };

  /*loadUserProfile() {
    this.http.fetch('/v1/resources/login', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'get'
    })
      .then(response => response.json())
      .then(data => {
        this.currentPage = 1;
        this.loadAchatsStats();
      })
  };*/

}

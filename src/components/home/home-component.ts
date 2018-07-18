import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {json} from 'aurelia-fetch-client';
import {bindable} from 'aurelia-framework';
import $ from 'jquery';
import {EventAggregator} from 'aurelia-event-aggregator';
import {PLATFORM} from 'aurelia-pal';
import 'jstree';
import {WebAPI} from '../../web-api';


@inject(HttpClient, WebAPI, EventAggregator)
export class HomeComponent {
  views = ['Agrégée', 'Pièce', 'Qualité'];
  @bindable currentView = 'Agrégée';
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
    console.log('methode created dans classe Home Component exécutée ')
    this.api.getContactList().then(contacts => this.contacts = contacts);
    this.api.getContactListCount()
      .then(total => {
        this.config.totalItems = total ;
        this.loadAchatsStats();
      });
  }

  setPage(num) {
    if (this.currentPage + num >= 1) this.currentPage += num;
    this.loadAchatsStats();
  };

  gotoFirstPage() {
    this.currentPage = 1;
    this.loadAchatsStats();
  };

  gotoLastPage() {
    console.log("this.config.totalItems="+ this.config.totalItems)
    console.log("this.config.pageSize="+ this.config.pageSize)
    this.currentPage = Math.ceil(this.config.totalItems / this.config.pageSize);
    console.log("METHODE gotoLastPage - this.currentPage="+this.currentPage);
    this.loadAchatsStats();
  };

  /* ******************************************************************************************************************** */
  /* ********************************************** Tableau Agrégé/Qualité ********************************************** */
  /* ******************************************************************************************************************** */

  loadAchatsStats() {
    console.log("currentPage="+ this.currentPage)
    let currentPageMoinsUn=this.currentPage-1;
    console.log("currentPage-1="+ currentPageMoinsUn)
    let debutIndex= currentPageMoinsUn*(this.config.pageSize);
    console.log("debutIndex="+debutIndex);
    let finIndex=this.currentPage*this.config.pageSize;

    console.log("finIndex="+ finIndex);
    this.achatsStats = this.contacts.slice((this.currentPage-1)*(this.config.pageSize), this.currentPage*this.config.pageSize);

  //  algo = ${((currentPage-1)*pageSize+1)} - ${currentPage*pageSize} of ${totalItems}

    this.achatsStatsReady = false;
  };

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

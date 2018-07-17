import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {WebAPI} from './web-api';
import {ContactUpdated,ContactLoaded} from './messages';
import {areEqual} from './utility';

interface Contact {
  firstName: string;
  lastName: string;
  email: string;
}

@inject(WebAPI, EventAggregator)
export class ContactDetail {
  routeConfig;
  contact: Contact;
  originalContact: Contact;

  constructor(private api: WebAPI, private ea: EventAggregator) { }

}

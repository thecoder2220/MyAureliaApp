import {EventAggregator} from 'aurelia-event-aggregator';
import {WebAPI} from './web-api';
import {ContactUpdated, ContactLoaded} from './messages';
import {inject} from 'aurelia-framework';

@inject(WebAPI, EventAggregator)
export class ContactList {
  contacts;
  selectedId = 0;

  constructor(private api: WebAPI, ea: EventAggregator) {
    ea.subscribe(ContactLoaded, msg => this.select(msg.contact));
    ea.subscribe(ContactUpdated, msg => {
      const id = msg.contact.id;
      const found = this.contacts.find(x => x.id == id);
      Object.assign(found, msg.contact);
    });
  }

  created() {
    this.api.getContactList().then(contacts => this.contacts = contacts);
  }

  select(contact) {
    this.selectedId = contact.id;
    return true;
  }
}

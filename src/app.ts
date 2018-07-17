import {Router, RouterConfiguration} from 'aurelia-router';
import {inject, PLATFORM} from 'aurelia-framework';
import {WebAPI} from './web-api';

@inject(WebAPI)
export class App {
  router: Router;

  constructor(public api: WebAPI) {}

  configureRouter(config: RouterConfiguration, router: Router){
    config.title = 'Contacts';
    config.map([
      { route: '',              moduleId: PLATFORM.moduleName('no-selection'),   title: 'Select' },
      { route: 'contacts/:id',  moduleId: PLATFORM.moduleName('contact-detail'), name:'contacts' },
      { route: 'contacts-datatable',  moduleId: PLATFORM.moduleName('contact-datatable'), name:'contacts-datatable' }
    ]);

    this.router = router;
  }

  gotoContactDataTablePage() {
    console.log('gotoContactDataTablePage activée')
    location.assign('#/contacts-datatable');
  }
}

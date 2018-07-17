const latency = 200;
let id = 0;

function getId() {
  return ++id;
}

const contacts = [
  {
    id: getId(),
    firstName: 'John',
    lastName: 'Tolkien',
    email: 'tolkien@inklings.com',
    phoneNumber: '867-5309'
  },
  {
    id: getId(),
    firstName: 'Clive',
    lastName: 'Lewis',
    email: 'lewis@inklings.com',
    phoneNumber: '867-5309'
  },
  {
    id: getId(),
    firstName: 'Owen',
    lastName: 'Barfield',
    email: 'barfield@inklings.com',
    phoneNumber: '867-5309'
  },
  {
    id: getId(),
    firstName: 'Charles',
    lastName: 'Williams',
    email: 'williams@inklings.com',
    phoneNumber: '867-5309'
  },
  {
    id: getId(),
    firstName: 'Roger',
    lastName: 'Green',
    email: 'green@inklings.com',
    phoneNumber: '867-5309'
  },
  {
    id: getId(),
    firstName: 'John 2',
    lastName: 'Tolkien 2',
    email: 'tolkien@inklings.com',
    phoneNumber: '867-5309'
  },
  {
    id: getId(),
    firstName: 'Clive 2',
    lastName: 'Lewis 2',
    email: 'lewis@inklings.com',
    phoneNumber: '867-5309'
  }
];

export class WebAPI {
  public isRequesting = false;

  public  getContactList() {
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        const results = contacts.map(x => {
          return {
            id: x.id,
            firstName: x.firstName,
            lastName: x.lastName,
            email: x.email
          }
        });
        resolve(results);
        this.isRequesting = false;
      }, latency);
    });
  }

  public  getContactDetails(id) {
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        const found = contacts.filter(x => x.id == id)[0];
        console.log('found='+found);
        resolve(JSON.parse(JSON.stringify(found)));
        this.isRequesting = false;
      }, latency);
    });
  }

  public  saveContact(contact) {
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        const instance = JSON.parse(JSON.stringify(contact));
        const found = contacts.filter(x => x.id == contact.id)[0];

        if (found) {
          const index = contacts.indexOf(found);
          contacts[index] = instance;
        } else {
          instance.id = getId();
          contacts.push(instance);
        }

        this.isRequesting = false;
        resolve(instance);
      }, latency);
    });
  }
}

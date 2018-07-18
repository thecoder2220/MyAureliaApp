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
  },
  {
    id: getId(),
    firstName: 'John 3 ',
    lastName: 'Tolkien 3',
    email: 'tolkien@inklings.com',
    phoneNumber: '867-5309'
  },
  {
    id: getId(),
    firstName: 'Clive 3',
    lastName: 'Lewis 3',
    email: 'lewis@inklings.com',
    phoneNumber: '867-5309'
  },
  {
    id: getId(),
    firstName: 'Owen 3',
    lastName: 'Barfield 3',
    email: 'barfield@inklings.com',
    phoneNumber: '867-5309'
  },
  {
    id: getId(),
    firstName: 'Charles 3',
    lastName: 'Williams 3',
    email: 'williams@inklings.com',
    phoneNumber: '867-5309'
  },
  {
    id: getId(),
    firstName: 'Roger 3',
    lastName: 'Green 3',
    email: 'green@inklings.com',
    phoneNumber: '867-5309'
  },
  {
    id: getId(),
    firstName: 'John 4',
    lastName: 'Tolkien 4',
    email: 'tolkien@inklings.com',
    phoneNumber: '867-5309'
  },
  {
    id: getId(),
    firstName: 'Clive 4',
    lastName: 'Lewis 4',
    email: 'lewis@inklings.com',
    phoneNumber: '867-5309'
  },
  {
    id: getId(),
    firstName: 'Owen 4',
    lastName: 'Barfield 4',
    email: 'barfield@inklings.com',
    phoneNumber: '867-5309'
  },
  {
    id: getId(),
    firstName: 'Charles 4',
    lastName: 'Williams 4',
    email: 'williams@inklings.com',
    phoneNumber: '867-5309'
  },
  {
    id: getId(),
    firstName: 'Roger 4',
    lastName: 'Green 4',
    email: 'green@inklings.com',
    phoneNumber: '867-5309'
  },
  {
    id: getId(),
    firstName: 'John 5',
    lastName: 'Tolkien 5',
    email: 'tolkien@inklings.com',
    phoneNumber: '867-5309'
  },
  {
    id: getId(),
    firstName: 'Clive 5',
    lastName: 'Lewis 5',
    email: 'lewis@inklings.com',
    phoneNumber: '867-5309'
  },
  {
    id: getId(),
    firstName: 'Owen 5',
    lastName: 'Barfield 5',
    email: 'barfield@inklings.com',
    phoneNumber: '867-5309'
  },
  {
    id: getId(),
    firstName: 'Charles 5',
    lastName: 'Williams 5',
    email: 'williams@inklings.com',
    phoneNumber: '867-5309'
  },
  {
    id: getId(),
    firstName: 'Roger 5',
    lastName: 'Green 5',
    email: 'green@inklings.com',
    phoneNumber: '867-5309'
  },
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

  public  getContactListCount() {
    this.isRequesting = true;
    return new Promise<number>(resolve => {
      setTimeout(() => {
        const results = contacts.length;
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

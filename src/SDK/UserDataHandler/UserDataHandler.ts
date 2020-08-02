import { generateUUID } from '../Helpers/Helpers';

export default class UserDataHandler {

  sid:any;
  uuid:any;
  messageHandler:any;
  userData:any;
  initiated:boolean = false;

  constructor(args:any) {
    this.sid = args.sid;
    this.messageHandler = args.messageHandler;
    this.messageHandler.addListener('sessionSent', this.onInit)
    this.genUUID();

    this.userData = {
      sid: this.sid, 
      type: 'userInfo',               
      username: '',
      uuid: this.uuid,
      id: null,
      sex: 'na',
      age: null,
      email: null,
      extra: {}
    };
    
    (window as any).ARC.updateUserInfo =(info: any)=> {
      this.userData.username = info.username;
      this.userData.id = info.id;
      this.userData.sex = info.sex;
      this.userData.age = info.age;
      this.userData.email = info.email;
      this.userData.extra = {
        ...this.userData.extra,
        ...info.extra
      }
      this.updateToServer();
    }
  }

  onInit =()=> {
    this.initiated = true;
    this.updateToServer();
  }

  updateToServer =()=> {
    if(this.initiated) {
      this.messageHandler.socket.emit('userInfo', JSON.stringify(this.userData), '');
    }
  }

  genUUID =()=> {
    let uuid = localStorage.getItem('arcuuid');
    if(uuid && uuid.length) {
      this.uuid = uuid;
    } else {
      this.uuid = generateUUID();
      localStorage.setItem('arcuuid', this.uuid);
    }
  }

  getUserData =()=> this.userData;

}
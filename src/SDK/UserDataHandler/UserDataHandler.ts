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
      uuid: this.uuid,
    };
    (window as any).ARC.updateUserInfo =(info: any)=> {
      if(info.username) {
        this.userData.username = info.username;
      }
      if(info.id) {
        this.userData.id = info.id;
      }
      if(info.sex) {
        this.userData.sex = info.sex;
      }
      if(info.age) {
        this.userData.age = info.age;
      }
      if(info.email) {
        this.userData.email = info.email;
      }
      if(info.extra) {
        this.userData.extra = {
          ...(this.userData.extra || {}),
          ...info.extra
        }
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
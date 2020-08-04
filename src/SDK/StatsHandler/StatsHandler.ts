import { eventTypes } from "../Constants/Constants";

export default class StatsHandler {

  trackDomElements: any = [
    {tagName: 'form', events: ['click']} 
  ]

  statsMap:any = {
    pc: { key: 'pageCount'},
    cc: { key: 'clickCount' },
    ec: { key: 'errorCount' },
  }
  messageHandler: any;
  sid: String;

  constructor(args: any) {
    args.recorder.onEvent = this.onEvent;
    this.messageHandler = args.messageHandler;
    this.sid = args.sid;
  }

  updateDomElTracker =()=> {
    for(let idx in this.trackDomElements) {
      let elms = document.getElementsByTagName(this.trackDomElements[idx].tagName);
      for(let jdx in elms) {
        for(let kdx in this.trackDomElements[idx].events) {
          elms[jdx].addEventListener(this.trackDomElements[idx].events[kdx], ()=>{ 
            this.sendUpdate({tag: this.trackDomElements[idx].tagName})
          })
        }
      }
    }
  }

  sendUpdate =(args: any)=> {
    let body = {
      sid: this.sid,
      type: 'update',
      ...args
    }
    this.messageHandler.socket.emit('update', JSON.stringify(body), '')
  }

  onEvent = (event:any) => {
    switch(event.type) {
      case eventTypes.hashChanged:
        this.sendUpdate({url: event.href})
        break;

      case eventTypes.snapshot:
        this.updateLS('pc')
        this.sendUpdate({url: event.location.href})
        this.updateDomElTracker()
        break;

      case eventTypes.mouseClick:
        this.updateLS('cc')
        break;

      case eventTypes.console:
        if(event.consoleType === 'error') {
          this.updateLS('ec')
        }
        break;

      case eventTypes.error:
        this.updateLS('ec')
        break;

      default:
        break;
        
    }
    // updateStats
  }

  updateLS = (key:any) => {
    let _currentStats:any = localStorage.getItem('arcstats');
    try {
      _currentStats = JSON.parse(_currentStats);
    } catch (e) {
      _currentStats = null
    }
    if(!_currentStats) {
      _currentStats = {};
      for(let key in this.statsMap) {
        _currentStats[key] = 0;
      }
    }
    _currentStats[key]++;
    localStorage.setItem('arcstats', JSON.stringify(_currentStats));
    let currentStats:any = {};
    for(let key in _currentStats) {
      currentStats[this.statsMap[key].key] = _currentStats[key]
    }
    this.messageHandler.socket.emit('stats', this.sid + ' ' +  JSON.stringify(currentStats), '')
  }

}
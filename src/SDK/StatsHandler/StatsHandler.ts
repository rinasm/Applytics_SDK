import { eventTypes, splitKey } from "../Constants/Constants";

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
      for(let jdx=0; jdx<elms.length;jdx++) {
        for(let kdx in this.trackDomElements[idx].events) {
          if(elms[jdx] && elms[jdx].addEventListener) {
            elms[jdx].addEventListener(this.trackDomElements[idx].events[kdx], ()=>{ 
              this.sendUpdate({tag: this.trackDomElements[idx].tagName})
            })
          }
        }
      }
    }
  }

  sendUpdate =(args: any)=> {
    if(args.tag) {
      let tags:any = localStorage.getItem('_arc_tags');
      try {
        tags = JSON.parse(tags);
      } catch (e) {
        tags = null;
      };

      if(!tags) {
        tags = {}
      }

      if(tags[args.tag]) { 
        return;
      }
      tags[args.tag] = true;
      localStorage.setItem('_arc_tags', JSON.stringify(tags));
    }

    let body = {
      ...args
    }
    for(let key in body) { 
      this.messageHandler.socket.emit('update', key + splitKey + body[key], '')
    }
  }

  onEvent = (event:any) => {
    switch(event.type) {
      case eventTypes.hashChanged:
        this.sendUpdate({url: event.href})
        break;

      case eventTypes.snapshot:
        this.updateLS('pc');
        let updateBody:any = {}
        if(event.initial) {
          updateBody.initialUrl = event.location.href;
        } else {
          updateBody.url = event.location.href;
        }
        this.sendUpdate(updateBody)
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
    this.messageHandler.socket.emit('stats', this.statsMap[key].key + splitKey + _currentStats[key], '')
  }

}
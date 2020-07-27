import { eventTypes } from "../Constants/Constants";

export default class StatsHandler {

  statsMap:any = {
    pc: { key: 'pageCount'},
    cc: { key: 'clickCount' },
    ec: { key: 'errorCount' },
  }
  messageHandler: any;

  constructor(args: any) {
    args.recorder.onEvent = this.onEvent;
    this.messageHandler = args.messageHandler;
  }

  onEvent = (event:any) => {
    switch(event.type) {
      case eventTypes.snapshot:
        this.updateLS('pc')
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
    this.messageHandler.socket.emit('stats', JSON.stringify(currentStats), '')
  }

}
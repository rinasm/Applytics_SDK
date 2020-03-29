import { 
    eventTypes, 
    consoleTrackList
} from '../Constants/Constants';

export default class ConsoleHandler {

    getRecorder: Function;
    tempConsole: any;

    constructor(args: any) {
        this.getRecorder =()=> args.getRecorder();
        if(window.location.host.indexOf('localhost') === -1) {
            this.trackAllConsoleActivity();
        }
    }


    trackConsole =(params:any, type:any)=> {
        let args = [];
        for(let idx=0; idx < params.length; idx++) {
            args.push(params[idx]);
        }
        this.getRecorder().generateEvent({
            type: eventTypes.console,
            consoleType: type,
            args
        })
    }

    trackAllConsoleActivity =()=> { 
        let tempConsole = {};
        const trackConsole = this.trackConsole;
        for (let idx in consoleTrackList) {
            if (typeof (console as any)[consoleTrackList[idx]] === 'function') {
                (tempConsole as any)[consoleTrackList[idx]] = (console as any)[consoleTrackList[idx]];
            }
        } 
        (window as any).log = console.log;
        this.tempConsole = tempConsole;
        const cloneConsole = function (key:any = null) {
            if (key !== null && key in tempConsole) {
                (console as any)[key] = function () {
                    trackConsole(arguments, key);
                    (console  as any)[key] = Function.prototype.bind.call((tempConsole  as any)[key], console);
                    (console  as any)[key].apply(console, arguments);
                    cloneConsole(key);
                };
            } else if (key === null) {
                for (let idx in tempConsole) {
                    (console  as any)[idx] = function () {
                        trackConsole(arguments, idx);
                        (console  as any)[idx] = Function.prototype.bind.call((tempConsole  as any)[idx], console);
                        (console  as any)[idx].apply(console, arguments);
                        cloneConsole(idx);
                    };
                }
            }
        }
        cloneConsole();
        window.onerror = function(error, url, line) {
            trackConsole([error, url, line], 'newError');
        }; 
    }

}
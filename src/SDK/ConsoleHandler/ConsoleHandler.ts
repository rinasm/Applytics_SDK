import { 
    eventTypes, 
    consoleTrackList
} from '../Constants/Constants';

export default class ConsoleHandler {

    getRecorder: Function;
    tempConsole: any;

    constructor(args: any) {
        this.getRecorder =()=> args.getRecorder();
        this.trackAllConsoleActivity();
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
            if (typeof (<any>console)[consoleTrackList[idx]] === 'function') {
                (<any>tempConsole)[consoleTrackList[idx]] = (<any>console)[consoleTrackList[idx]];
            }
        } 
        this.tempConsole = tempConsole;
        const cloneConsole = function (key:any = null) {
            if (key !== null && key in tempConsole) {
                (<any>console)[key] = function () {
                    trackConsole(arguments, key);
                    (<any>console)[key] = Function.prototype.bind.call((<any>tempConsole)[key], console);
                    (<any>console)[key].apply(console, arguments);
                    cloneConsole(key);
                };
            } else if (key === null) {
                for (let idx in tempConsole) {
                    (<any>console)[idx] = function () {
                        trackConsole(arguments, idx);
                        (<any>console)[idx] = Function.prototype.bind.call((<any>tempConsole)[idx], console);
                        (<any>console)[idx].apply(console, arguments);
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
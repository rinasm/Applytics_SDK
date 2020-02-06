import { 
    eventTypes, 
    commands
} from '../Constants/Constants';

export default class WindowEventHandler {

    ctrlKeyStatus: Boolean = false;
    resizeDebounce: any;

    getRecorder: Function;

    constructor(args: any) {

        this.getRecorder =()=> args.getRecorder();

        const trackWindowCommand =(e: any)=> {
            let code = (document.all) ? (<any>window.event).keyCode : e.which; 
            let cmd = null;
            if (this.ctrlKeyStatus && code == 86) {
                cmd = commands.PASTE;
            } else if (this.ctrlKeyStatus && code == 67) { 
                cmd = commands.COPY;
            } else if (this.ctrlKeyStatus && code == 83) { 
                cmd = commands.SAVE;
            } else if (this.ctrlKeyStatus && code == 68) { 
                cmd = commands.BOOKMARK;
            }

            if(cmd !== null) {
                this.getRecorder().generateEvent({
                    type: eventTypes.commandExecuted,
                    cmd
                })
            }
        }

        const trackCtrl =(e: any, isKeyDown:Boolean)=> {
            let code = e.keyCode || e.which;
            let isMac = (this.getRecorder().os||'').toLocaleLowerCase().indexOf('mac') !== -1;
            if((code === 91 && isMac) || (!isMac && code === 17)) {
                this.ctrlKeyStatus = isKeyDown;
            }
        }
        document.addEventListener('keydown', e=>trackCtrl(e, true), false);
        document.addEventListener('keyup', e=>trackCtrl(e, false), false);
        document.addEventListener('keydown', trackWindowCommand, false);
        this.trackWindowResize();
        this.trackHashChange();
    }


    trackWindowResize =()=> {
        window.addEventListener('resize', ()=> {
            clearTimeout(this.resizeDebounce);
            this.resizeDebounce = setTimeout(()=> {
                this.getRecorder().generateEvent({
                    type: eventTypes.windowResize,
                    screenWidth: window.innerWidth,
                    screenHeight: window.innerHeight,
                    scrollTop: document.documentElement.scrollTop,
                    scrollLeft: document.documentElement.scrollLeft,
                })
                this.checkConsoleStatus(true);
            }, 400)
        })
    }

    checkConsoleStatus =(generateEvent=false)=> {
        let devtools: Function = function(){};
        (<any>devtools).toString = function() { this.opened = true }
        console.log('%c', devtools);

        let prevStatus = this.getRecorder().consoleStatus || false;
        let currentStatus = (<any>devtools).opened &&
                            ((window.outerHeight - window.innerHeight > 150) || 
                            (window.outerWidth - window.innerWidth > 150));
        if(prevStatus !== currentStatus) {
            this.getRecorder().consoleStatus = currentStatus;
            if(generateEvent) {
                this.getRecorder().generateEvent({
                    type: eventTypes.consoleStatusChanged,
                    consoleStatus: this.getRecorder().consoleStatus,
                })
            }
            return true;
        }
        return false;
    }

    

    trackHashChange =()=> {
        window.onhashchange = ()=> { 
            let event:any = this.getRecorder().getURLDetails();
            event.type = eventTypes.hashChanged;
            this.getRecorder().generateEvent(event);
        }
    }

}
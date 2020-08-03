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
        document.addEventListener('keydown', this.onKeyDown, false);
        document.addEventListener('keyup', this.onKeyUp, false);
        document.addEventListener('keydown', this.trackWindowCommand, false);
        this.trackWindowResize();
        this.trackHashChange();
    }

    trackWindowCommand =(e: any)=> {
        let code = (document.all) ? (window.event as any).keyCode : e.which; 
        let cmd = null;
        if (this.ctrlKeyStatus && code === 86) {
            cmd = commands.PASTE;
        } else if (this.ctrlKeyStatus && code === 67) { 
            cmd = commands.COPY;
        } else if (this.ctrlKeyStatus && code === 83) { 
            cmd = commands.SAVE;
        } else if (this.ctrlKeyStatus && code === 68) { 
            cmd = commands.BOOKMARK;
        }

        if(cmd !== null) {
            this.getRecorder().generateEvent({
                type: eventTypes.commandExecuted,
                cmd
            })
        }
    }

    trackCtrl =(e: any, isKeyDown:Boolean)=> {
        let code = e.keyCode || e.which;
        let isMac = (this.getRecorder().os||'').toLocaleLowerCase().indexOf('mac') !== -1;
        if((code === 91 && isMac) || (!isMac && code === 17)) {
            this.ctrlKeyStatus = isKeyDown;
        }
    }

    onKeyDown =(e: any)=> this.trackCtrl(e, true);
    
    onKeyUp =(e: any)=> this.trackCtrl(e, false);

    stop =()=> {
        window.removeEventListener('resize', this.onWindowResize)
        document.removeEventListener('keydown', this.onKeyDown);
        document.removeEventListener('keyup', this.onKeyUp);
        document.removeEventListener('keydown', this.trackWindowCommand);
    }

    trackWindowResize =()=> {
        window.addEventListener('resize', this.onWindowResize)
    }

    onWindowResize = ()=> {
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
    }

    checkConsoleStatus =(generateEvent=false)=> {
        let devtools: Function = function(){};
        (devtools as any).toString = function() { this.opened = true }
        console.log('%c', devtools);

        let prevStatus = this.getRecorder().consoleStatus || false;
        let currentStatus = (devtools as any).opened &&
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
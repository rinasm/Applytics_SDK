let socket:any;
let listeners:any = {};
import { splitKey } from '../Constants/Constants'; 

export default class Socket {

    conneted: Boolean = false;
    buffer: any = [];

    constructor(host:any, sid:any, aid:any) {
        socket = new WebSocket(host);
        socket.onopen = function(e:any) {
            if((window as any).__ARC_DEV__) console.log('[ARC] Connection established');
            socket.send('/connect '+ sid + splitKey + aid + splitKey + ((window as any).rootSession ? 'initial' : ''));
            setInterval(()=> {
                socket.send('/hb');
            }, 30000)
        };

        socket.onmessage = (event:any) => {
            let topic = (event.data || '').split(' ');
            let data = topic[1];
            topic = topic[0];
            if(topic === 'Accepted') {
                this.conneted = true;
                if((window as any).__ARC_DEV__) console.log('[ARC] Socket Handshake done')
                for(let idx in this.buffer) {
                    this.emit( this.buffer[idx].topic, this.buffer[idx].data, this.buffer[idx].key )
                }
            }
            if(topic in listeners) {
                listeners[topic](data);
            }
        }

        socket.onclose = function(event:any) {
            if (event.wasClean) {
                if((window as any).__ARC_DEV__) console.log('[ARC] Connection closed cleanly, code=', event.code, 'reason=', event.reason);
            } else {
                if((window as any).__ARC_DEV__) console.log('[ARC] Connection died');
            }
        };
    }

    emit(topic:string, data:string, key:string) {
        if(this.conneted) {
            socket.send('/' + topic + splitKey + data + splitKey + key);
        } else {
            this.buffer.push({ topic, data, key })
        }
    }

    on(key:string, func:any) {
        listeners[key] = func;
    }

}
let socket:any;
let listeners:any = {};

export default class Socket {

    constructor(host:any, sid:any, aid:any) {
        socket = new WebSocket(host);
        socket.onopen = function(e:any) {
            console.log("[ARC] Connection established");
            socket.send('/connect '+ sid +' ' + aid);
            setInterval(()=> {
                socket.send('/hb');
            }, 30000)
        };

        socket.onmessage = function(event:any) {
            let topic = (event.data || '').split(' ');
            let data = topic[1];
            topic = topic[0];
            if(topic in listeners) {
                listeners[topic](data);
            }
        }

        socket.onclose = function(event:any) {
            if (event.wasClean) {
                console.log(`[ARC] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
            } else {
                console.log('[ARC] Connection died');
            }
        };
    }

    emit(topic:string, data:string, key:string) {
        socket.send('/' + topic + ' ' + data + ' ' + key);
    }

    on(key:string, func:any) {
        listeners[key] = func;
    }

}
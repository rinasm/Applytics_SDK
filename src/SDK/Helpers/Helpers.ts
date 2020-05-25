const generateRandomString =(length: Number)=> {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let idx = 0; idx < length; idx++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export const getBeaconID =()=> generateRandomString(5);

export const generateSID =()=> {
    return generateRandomString(4) + '-' + generateRandomString(4) + '-' + generateRandomString(2);
}

export const getSID =()=> {
    let sid = (window as any).apprc_sid || null;
    let arcsid = localStorage.getItem('arcsid') as any;
    let sidinit = parseInt(localStorage.getItem('sidinit') as any, 10);
    try {
        arcsid = JSON.parse(arcsid) as any
    } catch (e) {}
    if((arcsid && arcsid.sid && (document.referrer || '').indexOf(window.location.host) !== -1) || performance.navigation.type === 1) {
        (window as any).ARCNavigation = true;
        (window as any).sidinit = Date.now() - sidinit;
        console.log('[ARC] ' + (performance.navigation.type === 1 ? 'Refresh' : 'Navigation') +' Detected');
        console.log('[ARC] Total Previous Duration', (window as any).sidinit);
        console.log('[ARC] Current SID', arcsid.sid);
        return arcsid.sid
    }
    if(sid == null) {
        sid = generateSID();
        console.log('[ARC] Generating SID')
    }
    localStorage.setItem('sidinit', Date.now() as any);
    return sid;
}

export function loadJS(file:any, callback:any) {
    var jsElm = document.createElement("script");
    jsElm.type = "application/javascript";
    jsElm.src = file;
    jsElm.onload = callback;
    document.body.appendChild(jsElm);
}

const urlParserKey = '[^]'; 

export const parseURL =(url:any)=> (url||'').split('.').join(urlParserKey)

/**
 * 
 *  STORE
 * 
 */

export const newBeacon =(topic: any, data: any)=> {
    let bid = getBeaconID();
    let bobj = {
        topic,
        data,
        bid,
        ca: Date.now()
    }
    updateStore(bid, bobj);
}

export const beaconSendSuccess =(bid: any)=> {
    removeItemFromStore(bid)
}

export const getStore =()=> {
    return getCurrentStore().data;
}

const removeItemFromStore =(key: any)=> {
    let store = getCurrentStore();
    store.data = store.data.filter((d: any)=>d.bid !== key);
}

const updateStore =(key: any, data:any)=> {
    let store = getCurrentStore();
    store.data.push(data);
}

const newStore =(sid: string)=> {
    return {
        sid,
        data: []
    }
}

const getCurrentStore =()=> {
    return (window as any).arcbeaconstore;
}

const getCurrentStoreFromLS =(sid: string)=> {
    let store = localStorage.getItem('arcstore') as any;
    try {
        store = JSON.parse(store)
    } catch (e) {
        store = {}
    }
    if(!store || !store.sid || store.sid !== sid) {
        store = newStore(sid);
    } 
    return store;
}

export const initStore =(sid: any)=> {
    (window as any).arcbeaconstore = getCurrentStoreFromLS(sid);
    let err_log = localStorage.getItem('arcstore_log') as any;
    try {
        err_log = JSON.parse(err_log);
    } catch (e) {}
    console.log('[ARC] Pre-Buffer Storage Log', err_log);
}

export const saveStore =()=> {
    let newstore = {
        ...((window as any).arcbeaconstore.data as any),
        data: []
    }
    let idx;
    for(idx = (window as any).arcbeaconstore.data.length-1; idx >= 0; idx--) {
        newstore.data.push((window as any).arcbeaconstore.data[idx])
        let sdata = JSON.stringify(newstore); 
        try {
            localStorage.setItem('arcstore', sdata);
        } catch (e) {
            let log = {
                size: sdata.length / 1024,
                totalLength: (window as any).arcbeaconstore.data.length,
                pushed: (window as any).arcbeaconstore.data.length - idx,
            }
            localStorage.setItem('arcstore_log', JSON.stringify(log));
            idx = -2;
        }
    }
    if(idx !== -2) {
        let sdata = JSON.stringify(newstore); 
        let log = {
            size: sdata.length / 1024,
            totalLength: (window as any).arcbeaconstore.data.length,
            pushed: (window as any).arcbeaconstore.data.length,
        }
        localStorage.setItem('arcstore_log', JSON.stringify(log));
    }
}
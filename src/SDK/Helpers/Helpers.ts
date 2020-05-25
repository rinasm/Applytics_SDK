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
        bid
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
    delete store.data[key];
    // localStorage.setItem('arcstore', JSON.stringify(store));
}

const updateStore =(key: any, data:any)=> {
    let store = getCurrentStore();
    (window as any).arcbeaconstore.data[key] = data;
    localStorage.setItem('arcstore', JSON.stringify(store));
}

const newStore =(sid: string)=> {
    return {
        sid,
        data: {}
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
}

export const saveStore =()=> {
    try {
        localStorage.setItem('arcstore', JSON.stringify((window as any).arcbeaconstore));
    } catch(e) {
        localStorage.removeItem('arcstore');
    }
}
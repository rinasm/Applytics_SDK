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
    if(arcsid && arcsid.sid && ((document.referrer || '').indexOf(window.location.host) !== -1 || performance.navigation.type === 1)) {
        (window as any).ARCNavigation = true;
        (window as any).sidinit = Date.now() - sidinit;
        if((window as any).__ARC_DEV__) console.log('[ARC] ' + (performance.navigation.type === 1 ? 'Refresh' : 'Navigation') +' Detected');
        if((window as any).__ARC_DEV__) console.log('[ARC] Total Previous Duration', (window as any).sidinit);
        if((window as any).__ARC_DEV__) console.log('[ARC] Current SID', arcsid.sid);
        return arcsid.sid
    }
    if(sid == null) {
        sid = generateSID();
        localStorage.setItem('arceid', ''+0);
        localStorage.removeItem('arcstats');
        localStorage.removeItem('arcpindex');
        (window as any).rootSession = true;
        if((window as any).__ARC_DEV__) console.log('[ARC] Generating SID', sid)
    }
    localStorage.setItem('sidinit', (Date.now() - (performance as any).now()) as any);
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
const generateRandomString =(length: Number)=> {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let idx = 0; idx < length; idx++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

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
    if(arcsid && arcsid.createdAt && Date.now() - arcsid.createdAt < 8000 &&
        document.referrer !== window.location.href &&
        arcsid.location.href !== window.location.href) {
        (window as any).ARCNavigation = true;
        (window as any).sidinit = Date.now() - sidinit;
        console.log('[ARC] Navigation Detected');
        console.log('[ARC] Total Previous Duration', (window as any).sidinit);
        console.log('[ARC] Current SID', arcsid.sid);
        return arcsid.sid
    } else if(document.referrer === window.location.href) {
        console.log('[ARC] Reload Detected')
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
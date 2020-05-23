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
    try {
        arcsid = JSON.parse(arcsid) as any
    } catch (e) {}
    if(arcsid && arcsid.createdAt && Date.now() - arcsid.createdAt < 15000 && document.referrer !== window.location.href) {
        sid = arcsid.sid
        (window as any).ARCNavigation = true;
        console.log('[ARC] Navigation Detected');
    } else  if(document.referrer === window.location.href) {
        console.log('[ARC] Reload Detected')
    }
    console.log(arcsid);
    if(sid == null) {
        sid = generateSID();
        console.log('[ARC] Generating SID')
    }
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
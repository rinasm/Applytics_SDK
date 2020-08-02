export const host = 'wss://beacon.applytics.in';
export const SDK_VERSION = '0.6.15';
export const eventTypes = {
    snapshot: 'snapshot',
    characterData: 'characterData',
    childList: 'childList',
    attributes: 'attributes',
    scroll: 'scroll',
    inputValue: 'inputValue',
    mouseClick: 'mouseClick',
    mouseMove: 'mouseMove',
    assetLoaded: 'assetLoaded',
    styleSheetsLoadReq: 'styleSheetsLoadReq',
    xmlHttpReq: 'xmlHttpReq',
    console: 'console',
    browserMeta: 'browserMeta',
    windowResize: 'windowResize',
    consoleStatusChanged: 'consoleStatusChanged',
    commandExecuted: 'commandExecuted',
    hashChanged: 'hashChanged',
    styleSheetString: 'styleSheetString',
    error: 'error',
    touchStart: 'touchStart',
    touchEnd: 'touchEnd',
    touchMove: 'touchMove',
}
export const commands = {
    PASTE: "PASTE",
    COPY: "COPY",
    BOOKMARK: "BOOKMARK",
    SAVE: "SAVE"
}

export const blacklistedElByClass: Array<String> = [];
export const consoleTrackList: Array<any> = ['info', 'log', 'warn', 'error']
export const blacklistedAttrs: Array<String> = ['srcset']

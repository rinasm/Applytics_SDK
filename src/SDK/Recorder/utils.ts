export const isAttrPresent =(target: any)=> {
  let attrList = ['href'];
  for(let idx in target.attributes) {
      for(let jdx in attrList) {
          if(target.attributes[idx].localName === attrList[jdx]) {
              return true
          }
      }
  }
  return false;
}

export const recursivelyCheckTargetHasClickEvents:any =(target:any)=> {
  let jqEvents:any = {};
  if((window as any).$ && (window as any).$._data) {
      jqEvents = (window as any).$._data(target, 'events');
  }
  if(!jqEvents) {
      jqEvents = {};
  }
  let jsDirectEventMap = ['onclick', 'onmousedown', 'onmouseup', 'onchange']
  let jqEventMap = ['click', 'mousedown', 'mouseup']

  /**
   *  Direct JS Event Check
   */

  for(let idx in jsDirectEventMap) {
      if(target[jsDirectEventMap[idx]]) {
          return true;
      }
  }

  /**
   *  JqEvent Check
   */
  
  for(let idx in jqEventMap) {
      if(jqEvents[jqEventMap[idx]]) {
          return true;
      }
  }

  /**
   *  Attr Check
   */

  if(isAttrPresent(target) ||
      ['INPUT'].indexOf(target.tagName) !== -1) {
      return true;
  }
  
  /**
   *  Checking Parent
   */

  if(target.tagName !== 'BODY' && target.parentNode){
      return recursivelyCheckTargetHasClickEvents(target.parentNode);
  }
  return false;
}
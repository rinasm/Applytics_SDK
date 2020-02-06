import { 
    eventTypes, 
} from '../Constants/Constants';

export default class MutationHandler {

    getRecorder: Function;
    skippedMutations: any = 0;

    constructor(args: any) {
        this.getRecorder =()=> args.getRecorder();
    }


    handleMutations =(mutations:any)=> {
        let blacklistedNodes: Array<any> = this.getRecorder().getBlackListedNodes();
        mutations.forEach((mutation:any)=> {
            if(!mutation.target) 
                return;

            for(let idx in blacklistedNodes) {
                if(blacklistedNodes[idx].contains(mutation.target)) {
                    this.skippedMutations++;
                    return;
                }
            }

            console.log(this.skippedMutations);

            switch(mutation.type) {
                case eventTypes.characterData:
                    this.handleCharacterDataMutation(mutation);
                    break;

                case eventTypes.childList:
                    this.handleChildList(mutation);
                    break;

                case eventTypes.attributes:
                    this.handleAttributes(mutation);
                    break;
        
                default:
                    break;
            }
        })
    }



    handleCharacterDataMutation =(mutation:any)=> {
        this.getRecorder().generateEvent({
            rcid: mutation.target.rcid,
            type: eventTypes.characterData,
            text: mutation.target.data
        })
    }

    handleChildList =(mutation:any)=> {
        let removedNodes = [];
        let addedNodes = [];
        for(let idx=0; idx < mutation.removedNodes.length; idx++) {
            if(mutation.removedNodes[idx].rcid != null) {
                removedNodes.push(mutation.removedNodes[idx].rcid);
                this.getRecorder().unbindFromAllEvent(mutation.removedNodes[idx]);
            }
        }
        for(let idx=0; idx < mutation.addedNodes.length; idx++) {
            this.getRecorder().populateId(mutation.addedNodes[idx]);
            addedNodes.push(this.getRecorder().getHTML(mutation.addedNodes[idx]));
        }
        this.getRecorder().generateEvent({
            parent: mutation.target.rcid,
            type: eventTypes.childList,
            addedNodes,
            removedNodes,
            nextSibling: mutation.nextSibling ? mutation.nextSibling.rcid : null,
            previousSibling: mutation.previousSibling ? mutation.previousSibling.rcid : null,
        })
    }

    handleAttributes =(mutation:any)=> {
        this.getRecorder().generateEvent({
            rcid: mutation.target.rcid,
            type: eventTypes.attributes,
            attributeName: mutation.attributeName,
            attributeValue: mutation.target.getAttribute(mutation.attributeName)
        });
    }


}
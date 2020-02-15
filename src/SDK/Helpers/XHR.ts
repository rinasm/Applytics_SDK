export default {

    get:async (url: string, onprogress: any)=> {
        return new Promise(function(resolve, reject) {
            // executor (the producing code, "singer")
            let rq = new XMLHttpRequest(); 
            rq.onreadystatechange = function() {  
                if (rq.readyState === 4) {
                    let data = rq.responseText;
                    try {
                        data = JSON.parse(data);
                    } catch(e) {}
                    if(rq.status === 200) { 
                        resolve(data)
                    } else if(rq.status !== 200) {
                        reject(data)
                    }
                }
            }; 
            rq.open("GET", url, true); 
            if(onprogress) {
                rq.onprogress=onprogress;
            }
            rq.send(null);
        });
    }

}

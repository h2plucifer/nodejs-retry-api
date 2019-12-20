const fetch=require("../node_modules/node-fetch");
const serverUrl ="http://localhost:8000/getData"

const retryWrapper=(url, allowedRetry)=>{
    return new Promise((resolve,reject)=>{
        let attemptCount=1;
        const fetchData =(url,n)=>{
                   return fetch(url)
                            .then((res)=>{
                                if(res.status==200) return resolve(res);
                                else if(n===1) throw reject(new Error("Error in getting server response"))
                                else{
                                    
                                    console.log("Retying in fetchData then after a sec && retry count "+attemptCount);
                               
                                     setTimeout(()=>{
                                        attemptCount++;
                                         fetchData(url,n-1)
                                     },3000)
                                }
                            })
                            .catch((err)=>{
                                if(n==1) throw reject(err)
                                else{
                                    console.log("Retying in fetchData Catch a sec && retry count "+attemptCount);
                                    setTimeout(() => {
                                        fetchData(url, n-1)
                                    }, 3000);
                                }
                            })        
        }


        return fetchData(url,allowedRetry);
    })
}


retryWrapper(serverUrl, 3)
    .then((res)=>{return res.json()}).then((result)=>{console.log("Response from slow server :"+(JSON.stringify(result)));})
    .catch((err)=>{
        console.log("status :: "+err.status);
        console.log("Sorry error in getting response from server "+err.message);
    })


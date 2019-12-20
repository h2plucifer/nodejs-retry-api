const express =require('../node_modules/express');
const PORT = process.env.PORT || 8000;
const data={name:"lucifer" ,profile:"node.js developer"};
const app=express();

app.get("/getData" ,(req,res)=>{
    console.log("Slow  server has been requested data :: "+data);
    setTimeout(()=>{
        console.log(":: Now responding :: data"+JSON.stringify(data))
        //res.json({name:"lucifer" ,profile:"node.js developer"})
        res.send(data)
    },5000)
    
})

app.listen(PORT,()=>
    {
        console.log("Server listening at port :: "+PORT);
    })
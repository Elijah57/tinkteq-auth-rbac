import { app } from "./app";
import { configs } from "./configs/config";
import { connectDb } from "./configs/db";

const PORT = configs.port || 4000;


( async ()=>{
    try{
        await connectDb()
        app.listen(PORT, ()=>{
            console.log(`server is running at ${configs.host}:${PORT}`)
        })
    }catch(err){
        console.error(`failed to start server ${err}`)
        process.exit(1);
    }

})();


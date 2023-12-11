const express = require("express")
const bodyParser = require("body-parser")
const app = express();
app.use(bodyParser.json())
const dotenv = require('dotenv').config({ path: './.env' });
const PORT = process.env.port||5000;
const apiRouter = require("./routes/index")
app.listen(PORT,()=>{
    app.use("/api",apiRouter);
    console.log(`listning to ${PORT}`);

})
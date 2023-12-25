const express = require("express")
const bodyParser = require("body-parser")
const app = express();
app.use(bodyParser.json())
const dotenv = require('dotenv').config({ path: './.env' });
const PORT = process.env.port||5000;
const apiRouter = require("./routes/index")




app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Replace with your frontend URL
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
  
    if (req.method === 'OPTIONS') {
      res.sendStatus(200); // Preflight request response
    } else {
      next();
    }
  });

  
app.listen(PORT,()=>{
    app.use("/api",apiRouter);
    console.log(`listning to ${PORT}`);

})
require ('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const mongoDB = require("./db")
mongoDB();

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-Width, Content-Type, Accept"
    );
    next();
})


app.use(express.json())
app.use('/api',require("./Routes/CreateUser"));
app.use('/api',require("./Routes/DisplayData"));
app.use('/api',require("./Routes/OrderData"));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

// For deployment 
if(process.env.NODE_ENV === "production"){
  app.use(express.static("client/build"))
}
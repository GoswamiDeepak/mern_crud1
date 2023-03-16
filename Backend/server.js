const express = require('express');
const app = express();;
const PORT = 5000;
const database = require('./database');
const User = require('./Routes/userRoute');
const cors = require('cors');
app.use(express.json());
app.use(cors())
app.use(User);
app.use("/upload/",express.static("./uploads"));

app.listen(PORT, function(){
    console.log(`Listening on ${PORT}`);
})
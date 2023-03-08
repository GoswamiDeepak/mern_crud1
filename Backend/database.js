const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/marchmerncrud_1')
.then(()=>{
    console.log('Database connection established')
})
.catch((err)=>{
    console.log(err)
})
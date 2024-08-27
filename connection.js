//import mongoose
const mangoose = require('mongoose')

const connectionString = process.env.DATABASE

mangoose.connect(connectionString).then(()=>{
    console.log('mangoose connected successfully');
    
}).catch((err)=>{
    console.log(`connection faild due to ${err}`);
    
})

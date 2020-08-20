const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');



app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'ameya',
    password:'ameya@123',
    database:'ProjectDB',

});

mysqlConnection.connect((err)=>{
    
    if(!err)
    console.log('DB connected succesfully');
    else
    console.log('DB connection failed \n Error'+ JSON.stringify(err,undefined,2));
});
 
const bookRoute = require('./routes/books');
const authorRoute = require('./routes/author');
const reviewRoute = require('./routes/review');


app.get('/',(req,res)=>{
    res.send("main page");
});

app.use('/books',bookRoute);
app.use('/author',authorRoute);
app.use('/review',reviewRoute);




app.listen(3000,()=>console.log("express server is running at port no:3000"));



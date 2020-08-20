const express = require('express');
 const mysql = require('mysql');
 var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'ameya',
    password:'ameya@123',
    database:'ProjectDB',

});
const router = express.Router();




router.get('/',(req,res)=>{
    mysqlConnection.query('SELECT * FROM review',(err,rows,fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
});

router.get('/book/:bookid',(req,res)=>{
    mysqlConnection.query('SELECT * FROM review WHERE  bookid = ?  ',[req.params.bookid],(err,rows,fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
});



router.get('/:id',(req,res)=>{
    mysqlConnection.query('SELECT * FROM review WHERE  reviewid = ?  ',[req.params.id],(err,rows,fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
});


router.post('/', function (req, res) {         var params  = req.body;
    mysqlConnection.query('INSERT INTO review SET ?', params, function (error, rows, fields) {
if (error) throw error;
res.send("the new reviewid is:"+rows.insertId);

});
});

router.delete('/:id',(req,res)=>{
  mysqlConnection.query('DELETE FROM review WHERE reviewid = ?',[req.params.id],(err,rows,fields)=>{
   if(!err)
   res.send("deleted succesfully!!");
   else
   console.log(err);
  })
});

router.put('/:id', function (req, res) {
mysqlConnection.query('UPDATE `review` SET `reviewid`=?,`review`=? ,`bookid`=? where `reviewid`=?', [req.body.reviewid,req.body.review, req.body.bookid,req.params.id], function (error, results, fields) {
  if (error) throw error;
   res.send("updated succesfully!!");
  });
});
module.exports = router;
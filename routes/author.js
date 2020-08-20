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
    mysqlConnection.query('SELECT * FROM author',(err,rows,fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
});





router.get('/:id',(req,res)=>{
    mysqlConnection.query('SELECT a.authorid,a.authorname FROM author a WHERE  a.authorid = ?  ',[req.params.id],(err,rows,fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
});

router.post('/', function (req, res) {         var params  = req.body;
    mysqlConnection.query('INSERT INTO author SET ?', params, function (error, rows, fields) {
if (error) throw error;
res.send("the new authorid is:"+rows.insertId);

});
});

router.delete('/:id',(req,res)=>{
  mysqlConnection.query('DELETE FROM author WHERE authorid = ?',[req.params.id],(err,rows,fields)=>{
   if(!err)
   res.send("deleted succesfully!!");
   else
   console.log(err);
  })
});

router.put('/:id', function (req, res) {
mysqlConnection.query('UPDATE `author` SET `authorid`=?,`authorname`=? where `authorid`=?', [req.body.authorid,req.body.authorname, req.params.id], function (error, results, fields) {
  if (error) throw error;
   res.send("updated succesfully!!");
  });
});
module.exports = router;
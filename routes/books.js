const express = require('express');
 const mysql = require('mysql');
const { response } = require('express');
 var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'ameya',
    password:'ameya@123',
    database:'ProjectDB',
    

});
const router = express.Router();

router.get('/',(req,res)=>{
    mysqlConnection.query('SELECT * FROM book',(err,rows,fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
});


router.get('/author/:id',(req,res)=>{
    mysqlConnection.query('SELECT bookname FROM book b WHERE  b.authorid = ?  ',[req.params.id],(err,rows,fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
});
router.get('/:id',(req,res)=>{
    mysqlConnection.query('SELECT * FROM book b WHERE  b.bookid = ?  ',[req.params.id],(err,rows,fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
});


 router.post('/', function (req, res) {         var params  = req.body;
                 mysqlConnection.query('INSERT INTO book SET ?', params, function (error, rows, fields) {
           if (error) throw error;
            res.send("the new bookid is:"+rows.insertId);
            
          });
 });

router.delete('/:id',(req,res)=>{
    mysqlConnection.query('DELETE FROM book WHERE bookid = ?',[req.params.id],(err,rows,fields)=>{
        if(!err)
        res.send("deleted succesfully!!");
        else
        console.log(err);
    })
});
router.put('/:id', function (req, res) {
    mysqlConnection.query('UPDATE `book` SET `bookid`=?,`bookname`=?,`bookdesc`=?,`authorid`=? where `bookid`=?', [req.body.bookid,req.body.bookname, req.body.bookdesc, req.body.authorid, req.params.id], function (error, results, fields) {
       if (error) throw error;
       res.send("updated succesfully!!");
     });
 });





module.exports = router;
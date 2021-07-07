var express = require('express');
var router = express.Router();
var mysql = require("mysql2");
var moment = require("moment");

var connection = mysql.createConnection({
    host : "localhost", //127.0.0.1
    port : 3306,
    user : "root",
    password : "1234",
    database : "test"
});


router.get('/',function(req,res,next){  
    console.log("/board start")     
    connection.query(
        `select * from board`,
        function(err,result){
            if(err){
                console.log(err);
                res.send("select Error")
            }else{
                console.log(result)
                res.render('index',{
                    content : result
                })
            }
        }
    )      
})

router.get("/add", function(req,res,next){
    res.render('add');
})

router.post("/add_2", function(req,res,next){
    var title = req.body.title;
    var content = req.body.content;
    var img = req.body.img;
    var date = moment().format("YYYYMMDD");
    var time = moment().format("HHmmss");
    var author = req.body.author;
    console.log(title,content);
    if(!req.session.logged){
        res.redirect('/');
    }else{
        var author = req.session.logged.name;
        var post_id = req.session.logged.post_id;
        connection.query(
            `insert into board(title, content, img, date, time, author, post_id) values(?,?,?,?,?,?,?)`,
            [title, content, img, date, time, author, post_id],
            function(err,result){
                if(err){
                    console.log(err);
                    res.send("add insert Error");
                }else{
                    res.redirect("/board");
                }
            }
        )
    }
})



router.get('/',function(req,res,next){
    res.render('Main_Page.ejs');
})

router.get('/info',function(req,res,next){
    var no = req.query.no;
    console.log(no);
    connection.query(
        `select * from board where No = ?`,
        [no],
        function(err,result){
            if(err){
                console.log(err)
                res.send("Info select Error");
            }else{
                res.render("info",{
                    content : result,
                    post_id : req.session.logged.post_id
                })
            }
        }
    )
})

router.get("/del", function(req,res,next){
    var no = req.query.no;
    console.log(no);
    connection.query(
        `delete from board where No = ?`,
        [no],
        function(err,result){
            if(err){
                console.log(err);
                res.send("delete Error");
            }else{
                res.redirect("/board");
            }
        }
    )
})

router.get("/update", function(req,res,next){
    var no = req.query.no;
    console.log(no);
    connection.query(
        `select * from board where No = ?`,
        [no],
        function(err,result){
            if(err){
                console.log(err);
                res.send("update select Error");
            }else{
                res.render('update',{
                    content : result
                })
            }
        }
    )
})

router.get('/FirstPage',function(req,res,next){
    res.render('1st_Page.ejs');
})

router.get('/SecondPage',function(req,res,next){
    res.render('2nd_Page.ejs');
})

router.get('/ThirdPage',function(req,res,next){
    res.render('3rd_Page.ejs')
})

router.get('/FourthPage',function(req,res,next){
    res.render('4th_Page.ejs');
})

router.get('/FifthPage',function(req,res,next){
    res.render('5th_Page.ejs');
})

router.get('/SixthPage',function(req,res,next){
    res.render('6th_Page.ejs')
})

router.get('/SeventhPage',function(req,res,next){
    res.render('7th_Page.ejs')
})

module.exports = router;
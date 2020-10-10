const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.urlencoded({
  extended: false
}));
const BlogPost = require('../models/blogpost');

router.get("/", function (req, res) {
  BlogPost.find(function (err, post) {
    if (err) {
      console.log(err);
    } else {
      res.json(post);
    }
  });
})

/*******************save*********************/
router.post("/save", (req, res) => {
  const bodytext = req.body;


  const newBlogspot = new BlogPost(bodytext);
  newBlogspot.save((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Inserted Sucessfully")
      res.json({
        msg: "data inserted Sucessfully!!!!"
      });
    }
  });
});

/********************RemoveData*************/
router.post("/Removedata", function (req, res) {
  const bodytext = req.body;
  BlogPost.deleteOne({
    Cemail: req.body.Cemail
  }, function (err) {
    if (err) {
      res.send(err);
    } else {
      res.send({
        data: "Record has been Deleted..!!"
      });
    }
  });
})
/*******************Single ID Fetch */
router.get("/company/:email", function (req, res) {
  const email = req.params.email

  BlogPost.find({
    Cemail: email
  }, function (err, post) {
    if (err) {
      console.log(err);
    } else {
      res.json(post);
    }
  });
})
/******Single ID update */
router.put("/update", function (req, res) {
  const bodytext = req.body;
  console.log("upost:", bodytext);
  BlogPost.updateMany({
    Cemail: bodytext.Cemail
  }, {
    $set: {
      Cname: bodytext.Cname,
      Cdesc: bodytext.Cdesc,
      Cno: bodytext.Cno,
      Cemail: bodytext.Cemail,
      Clogo: bodytext.Clogo,
      CState: bodytext.CState,
      Ccity: bodytext.Ccity,
    }
  }, function (err, post) {
    if (err) {
      console.log(err);
    } else {
      res.json(post);
    }
  })
})
/****************************Single ID retrieve */
router.get("/single/:id?", function (req, res) {
const id =req.params.id;
BlogPost.findById(id,function (err, post) {
    if (err) {
      console.log(err);
    } else {
      res.json(post);
    }
  });
})

/*Pagination*/
router.get("/:id?", function (req, res) {
  //Pagination For number Of receords on page
  if (req.params.id) {
      //Case For Counting Number OF Users
      BlogPost.find({})
      .count()
      .then(data => {
        res.json(data);
      })
      .catch(err => {
         res.status(400).send({
             "err" : err
         })
      })
  }
})

router.post("/page",function(req,res){
  //PageNumber From which Page to Start 
  const bodytext = req.body;
  console.log(req.body.page)
  console.log("values:", bodytext);
  const pagination=6;
  const pageNumber = req.body.page ? parseInt(req.body.page) : 1;
  BlogPost.find({})
      //skip takes argument to skip number of entries 
      .sort({"id" : 1})
      .skip((pageNumber - 1) * pagination)
      //limit is number of Records we want to display
      .limit(pagination)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
          res.status(400).send({
              "err": err
          })
      })
})


module.exports = router;
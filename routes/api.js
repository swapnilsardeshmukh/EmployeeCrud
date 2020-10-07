const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
const BlogPost = require('../models/blogpost');

router.get("/", function(req, res) {
    BlogPost.find(function(err,post){
    if(err){
        console.log(err);
      }
      else{
        console.log(post);
        res.json(post);
        }
    });
})


router.post("/save", (req, res) => {
  const bodytext=req.body;
   console.log(bodytext);

   const newBlogspot=new BlogPost(bodytext);
   newBlogspot.save((err) =>{
 if(err){
   console.log(err);
 }
else{
  console.log("Inserted Sucessfully")
  res.json({msg:"data inserted Sucessfully!!!!"});
}
});
    });





module.exports = router;

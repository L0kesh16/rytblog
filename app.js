//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const app = express();
const mongoose = require("mongoose");


app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
const CONNECTION_URL="mongodb+srv://Lokesh16:Lokesh123@cluster0.b1unktw.mongodb.net/BlogDB";
mongoose.connect(CONNECTION_URL);

const HomeStartingContent = "Hi I am Lokesh! This is my First Blog Website. Hope, You like it!!!"
const aboutContent = "I am Lokesh , Nothing Great to Say"
const contactContent = "You can't Contact me ! Coz I am Currently unavailable"

const postSchema = {
    title:String,
    content:String
};

const Post= mongoose.model("post",postSchema); 
//let posts = [];

app.get("/posts/:postid",function(req,res){
    const respostid = req.params.postid;
    Post.findOne({_id: respostid},function(err,posts){
        
            res.render("post",{ Title : posts.title,Post :posts.content 
            });
        
        
    });
});
 
app.get("/",function(req,res)
{
    Post.find({},function(err,posts)
    {
 res.render("home",{SC: HomeStartingContent ,posts :posts ,});
});
});
app.get("/about",function(req,res)
{
    res.render("about", {AC : aboutContent });
});
app.get("/contact",function(req,res)
{
    res.render("contact",{ CC : contactContent });
});
app.get("/compose",function(req,res)
{
    res.render("compose");
});
app.post("/compose",function(req,res)
{
    const post = new Post ({
        title : req.body.postTile,
        content : req.body.postBody
      });
      console.log(post);
    post.save(function(err)
    {
        if(!err)
        {
            res.redirect("/");
        }
    });
   
});



app.listen(process.env.PORT || 3000,function()
{
    console.log("Server Ready");
});

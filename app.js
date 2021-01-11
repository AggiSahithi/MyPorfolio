//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "I'm a second year undergraduate in the department of Mechanical Engineering at Indian Institute of Technology, Kharagpur. My hobbies are playing football, watching movies.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const posts = [];

app.post("/compose", function(req, res){
  let post = {
    title: req.body.postTitle,
    body: req.body.postBody
  };

  posts.push(post);

  res.redirect("/");
})

app.get('/', (req, res) => {
  res.render("home", {
    StartingContent: homeStartingContent,
    posts: posts
  });
});

app.get('/about', (req, res) => {
  res.render("about", {aboutPageContent: aboutContent});
});

app.get('/contact', (req, res) => {
  res.render("contact", {contactPageContent: contactContent});
});

app.get('/compose', (req, res) => {
  res.render("compose");
});

app.get('/posts/:postName', function (req, res) {
  let requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){

   let storedTitle = _.lowerCase(post.title);
   let str = post.body;

    if(storedTitle === requestedTitle){
      res.render("post", {pTitle: post.title, pBody: str});
    }
  });

});












app.listen(3000, function() {
  console.log("Server started on port 3000");
});

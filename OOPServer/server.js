const express = require("express");
const subdomain = require('express-subdomain');
const bodyParser = require("body-parser");

const app = express();
const router = express.Router({mergeParams: true});

const {Forums, Users, Forum, User, Admin} = require('./index.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

///////////////////

// * No UI Yet, but the api is working for both seeing posts on a forum and seeing a users posts / comments.

///////////////////

new Forum({title: 'news'});
const admin = new Admin({username: 'Ben'})
const firstPost = admin.createPost('news', {title: 'First Post on Copyit', text: ':)'})
const secondPost = admin.createPost('news', {title: 'second Post', text: 'second post!!'})
const firstComment = admin.commentOnPost(firstPost, {text: 'Its working 0.0'})

///////////////////

app.listen(2053, () => {console.log(`Server running on port: ${2053}`)});

app.get('/r/:forum', (req, res) => {
  const wantedForum = req.params.forum;
  return res.json(
    Forums[wantedForum]
      ? formatPosts(Forums[wantedForum].posts)
      : {'err': 'Invalid Forum'}
  )
})

app.get('/u/:user', (req, res) => {
  const wantedUser = (req.params.user).toLowerCase();

  return res.json(
    Users[wantedUser]
      ? {
        'posts': formatPosts(Object.values(Users[wantedUser].posts)[0]),
        'comments': formatComments(Object.values(Users[wantedUser].comments))
      }
      : {'err': 'Invalid user'}
  )
})

app.get('/', (req, res, next) => { return res.json({msg: 'OK'}) });


app.use(function(req, res) { res.status(400) });

// ============

function formatPosts(posts={}) {
  return Object.values(posts).map(({title,text,author,date,comments}) => 
    ({title, text, date, 'author': author?.username, 'comments': formatComments(comments)})
  );
}

function formatComments(comments={}) {
  return Object.values(comments).map(({author, text, date}) => ({text, date, 'author': author?.username}))
}

exports.module = Forums
// Reddit 2
const Forums = {};
const Users = {};

const { nanoid } = require("nanoid");


class User {
  constructor({username}) {
    let lowerCaseUsername = username.toLowerCase()
    if (Users[lowerCaseUsername]) { return {'err': 'User Already Exists'} }

    this.username = username;
    this.posts = {};
    this.comments = {};

    Users[lowerCaseUsername] = this;
  }

  createPost(forumName, {title, text}) {
    const forum = Forums[forumName];
    // Check for forum limitations.
    if (!this.isAdmin && Forums[forumName].minComments && Object.keys(this.comments[forumName] || {}).length < forum.minComments) {
      return 'Not enough comments';
    }

    let postID = nanoid();
    let newPost = new Post({forum, id: postID, title, author: this, text});

    if (!this.posts[forumName]) this.posts[forumName] = {}

    this.posts[forumName][postID] = newPost;
    forum.posts[postID] = newPost;
    return newPost;
  }
  commentOnPost(post, {text}) {
    const forum = post.forum;

    let commentID = nanoid();
    let newComment = new Comment({post, id: commentID, author: this, text});

    if (!this.comments[forum.title]) this.comments[forum.title] = {}

    this.comments[forum.title][commentID] = newComment;
    post.comments[commentID] = newComment;
    return newComment;
  }
  createPoll(forumName, {title, options=[]}) {
    const forum = Forums[forumName];

    let pollID = nanoid();
    let newPoll = new Poll({forum, id: pollID, title, author: this, options});

    if (!this.posts[forumName]) this.posts[forumName] = {}
    this.posts[forumName][pollID] = newPoll;
    forum.posts[pollID] = newPoll;
    return newPoll;
  }

  voteOnPost(post, {type}) {
    post.likeDislike({username: this.username, type});
  }

  deleteOwnPost(post) {
    if (post.author === this) { // Validate who the post belongs to
      delete post.forum.posts[post.id];
      delete this.posts[post.forum.title][post.id];
    }
  }
  deleteOwnComment(comment) {
    if (comment.author === this) { // Validate who the post belongs to
      delete comment.post.comments[comment.id];
      delete this.comments[comment.post.forum.title][comment.id];
    }
  }
}

class Admin extends User {
  constructor(username) {
    super(username);
    this.isAdmin = true;
  }
  deletePost(post) {
    delete post.forum.posts[post.id];
    delete post.author.posts[post.forum.title][post.id];
  }
  deleteComment(comment) {
    delete comment.post.comments[comment.id];
    delete comment.author.comments[comment.post.forum.title][comment.id];
  }
}

// ========

class Forum {
  constructor({title, minComments}) {
    if (Forums[title]) { return {'err': 'Forum Already Exists'} }

    this.id = nanoid();
    this.title = title;
    this.minComments = minComments;

    this.posts = {};
    Forums[title] = this;
  }
}

class UserCreated {
  constructor({id, author, text}) {
    this.id = id;
    this.author = author;
    this.text = text;
    this.date = new Date(Date.now());

    this.likes = new Set();
    this.dislikes = new Set();
  }
  likeDislike({username, type}) {
    if (this.likes.has(username)) {
      this.likes.delete(username);
      if (type === 'dislike') { this.dislikes.add(username) }
    } else if (this.dislikes.has(username)) {
      this.dislikes.delete(username);
      if (type === 'like') { this.likes.add(username) }
    } else {
      type === 'like'
        ? this.likes.add(username)
        : this.dislikes.add(username);
    }
  }
  getVotes() {
    return (this.likes.size + -(this.dislikes.size));
  }
}

class Post extends UserCreated {
  constructor({forum, id, title, author, text=''}) {
    super({id, author, text})
    this.forum = forum;
    this.title = title;

    this.comments = {};
  }
}

class Comment extends UserCreated {
  constructor({post, id, author, text}) {
    super({id, author, text})
    this.post = post;
  }
}

class Poll extends Post {
  constructor({forum, id, title, author, options=[]}) {
    super({forum, id, title, author})
    this.options = {};

    for(let i=0; i<options.length; i++) {
      this.options[i] = {text: options[i], votes: 0}
    }
  }
  vote(option) {this.options[option].votes++};
}

// ===================

module.exports = {Forums, Users, Forum, User, Admin};
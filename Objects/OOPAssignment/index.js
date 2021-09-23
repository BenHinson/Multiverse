// Reddit 2.0

class User {
  constructor({username}) {
    this.username = username;
    this.posts = {};
    this.comments = {};
  }

  createPost(forum, {title, text}) {
    // Check for forum limitations.
    if (!this.isAdmin && forum.minComments && Object.keys(this.comments[forum.id] || {}).length < forum.minComments) {
      return 'Not enough comments';
    }

    let postID = Math.floor(Math.random() * 1000000) // Would use UUID();
    let newPost = new Post({forum, id: postID, title, author: this, text});

    if (!this.posts[forum.id]) this.posts[forum.id] = {}

    this.posts[forum.id][postID] = newPost;
    forum.posts[postID] = newPost;
    return newPost;
  }
  commentOnPost(post, {text}) {
    let commentID = Math.floor(Math.random() * 1000000) // Would use UUID();
    let newComment = new Comment({post, id: commentID, author: this, text});

    if (!this.comments[post.forum.id]) this.comments[post.forum.id] = {}

    this.comments[post.forum.id][commentID] = newComment;
    post.comments[commentID] = newComment;
    return newComment;
  }
  createPoll(forum, {title, options=[]}) {
    let pollID = Math.floor(Math.random() * 1000000) // Would use UUID();
    let newPoll = new Poll({forum, id: pollID, title, author: this, options});

    if (!this.posts[forum.id]) this.posts[forum.id] = {}
    this.posts[forum.id][pollID] = newPoll;
    forum.posts[pollID] = newPoll;
    return newPoll;
  }

  voteOnPost(post, {type}) {
    post.likeDislike({username: this.username, type});
  }

  deleteOwnPost(post) {
    if (post.author === this) { // Validate who the post belongs to
      delete post.forum.posts[post.id];
      delete this.posts[post.forum.id][post.id];
    }
  }
  deleteOwnComment(comment) {
    if (comment.author === this) { // Validate who the post belongs to
      delete comment.post.comments[comment.id];
      delete this.comments[comment.post.forum.id][comment.id];
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
    delete post.author.posts[post.forum.id][post.id];
  }
  deleteComment(comment) {
    delete comment.post.comments[comment.id];
    delete comment.author.comments[comment.post.forum.id][comment.id];
  }
}

// ========

class Forum {
  constructor({title, minComments}) {
    this.id = Math.floor(Math.random() * 1000000) // Would use UUID();
    this.title = title;
    this.minComments = minComments;

    this.posts = {};
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

module.exports = {Forum, User, Admin};
const {Forum, User, Admin} = require('./index');

let forum, user, admin, post, poll, comment;

test('Forum creation', () => {
  forum = new Forum({title: 'Gardening'});
  expect(forum.title).toBe('Gardening');
})

test('Create a User', () => {
  user = new User({username: 'example'});
  expect(user.username).toBe('example');
})

test('Create an Admin Account', () => {
  admin = new Admin({username: 'admin'});
  expect(admin.username).toBe('admin');
})

test('Create a post', () => {
  post = user.createPost(forum, {title: 'My Roses', text: 'Look at these Roses'})

  expect(post.author.username).toBe(user.username);
  expect(post.title).toBe('My Roses');
  expect(post.text).toBe('Look at these Roses');

  expect(user.posts[forum.id][post.id]).toBe(post);
})

test('Write a comment on a post', () => {
  comment = user.commentOnPost(post, {text: 'Wow!'});
  expect(comment.text).toBe('Wow!');
  expect(comment.author.username).toBe(user.username);
  expect(user.comments[post.forum.id][comment.id]).toBe(comment);
})

test('Admin Delete Post & Comment', () => {
  admin.deleteComment(comment);
  expect(post.comments[comment.id]).toBe(undefined);
  
  admin.deletePost(post);
  expect(forum.posts[post.id]).toBe(undefined);
})

test('Create an admin poll', () => {
  poll = admin.createPoll(forum, {title: 'Favorite Flower?', options: ['Daisy', 'Dandelion', 'Rose', 'Blue Bell']})
  expect(poll.options[0].text).toBe('Daisy');
  expect(poll.options[0].votes).toBe(0);
  expect(poll.author.username).toBe('admin');

  poll.vote(2);
  expect(poll.options[2].votes).toBe(1);
})


let limitedForum, adminPost, nonAdminComment, nonAdminPost;

test('Limited Forum', () => {
  limitedForum = new Forum({title: 'Exclusive', minComments: 2} );
  expect(user.createPost(limitedForum, {title: 'Its not going to worrrrk', text: '- Hermione Granger - The Goblet of Fire'})).toBe('Not enough comments');

  adminPost = admin.createPost(limitedForum, {title: 'First Post!', text: 'Working :)'});
  expect(adminPost).toBe(limitedForum.posts[adminPost.id]);

  nonAdminComment = user.commentOnPost(adminPost, {text: 'First Comment...'});
  user.commentOnPost(adminPost, {text: 'Second Comment...'});

  nonAdminPost = user.createPost(limitedForum, {title: 'Yay!', text: 'Hello Exclusive Group!'})
  expect(nonAdminPost).toBe(limitedForum.posts[nonAdminPost.id]);
})

test('Delete Own Comment (Non-Admin)', () => {
  user.deleteOwnComment(nonAdminComment);
  expect(adminPost.comments[nonAdminComment.id]).toBe(undefined);
})
test('Delete Own Post (Non-Admin)', () => {
  user.deleteOwnPost(nonAdminPost);
  expect(limitedForum.posts[nonAdminPost.id]).toBe(undefined);
})


test('Voting on a Post', () => {
  user.voteOnPost(adminPost, {type: 'like'});
  expect(adminPost.getVotes()).toBe(1);
  user.voteOnPost(adminPost, {type: 'like'});
  expect(adminPost.getVotes()).toBe(0);
  user.voteOnPost(adminPost, {type: 'like'});
  expect(adminPost.getVotes()).toBe(1);
  user.voteOnPost(adminPost, {type: 'dislike'});
  expect(adminPost.getVotes()).toBe(-1);
  user.voteOnPost(adminPost, {type: 'like'});
  expect(adminPost.getVotes()).toBe(1);
})
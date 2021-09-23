-   good idea to have 1 class per file
-   `// Check for forum limitations` - I would put this code in a separate function
    and also should probably be on the forum class e.g. forum.userCanComment(user)
-   `Math.floor(Math.random() * 1000000)` you don't need to have very many users for this
    to stop working (see Birthday probability problem). It would be better to have the parent
    keep track of the maxId it has used, and ++ it each time. E.g. each forum would have a
    `this.maxPostId = 1` initially and increment it every time a post is created.
-   think it makes more sense for the `new Post` and `new Comment` to be created on the
    forum and post respectively, rather within the user. The user should supply the data, but
    its the forum and posts job to workout how they want to store it.
-   I like the use of sets for likes vs dislikes
-   `let forum, user, admin, post, poll, comment;` generally, you want each test to be independent from
    one another so I'm not a fan of this. You can create seed data before the tests if you like, but it's
    good practice to reset it to the same state after each test.

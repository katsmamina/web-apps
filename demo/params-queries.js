const express = require('express');
const app = express();

// /post/5/comments – get the comments from the post 5th in array

const posts = [
  { name: 'post-1', author: 'alex', body: 'Alex posted' },
  { name: 'post-2', author: 'bernard', body: 'Bernard posted' },
  { name: 'post-3', author: 'chris', body: 'Chris posted' },
  { name: 'post-4', author: 'david', body: 'David posted' },
  { name: 'post-5', author: 'evan', body: 'Evan posted' },
];

//queries – more flexible
app.get('/threads', function (req, res) {
  let filteredPosts = posts;
  if (req.query.title) {
    filteredPosts = posts.filter((p) => p.name === req.query.title);
  }
  if (req.query.author) {
    filteredPosts = posts.filter((p) => p.author === req.query.author);
  }
  res.send(filteredPosts);
});

//params – mandatory
app.get('/threads/:id', function (req, res) {
  const index = parseInt(req.params.id);
  console.log(`giving back post number ${index}`);
  console.log(req);
  res.send(posts[index]);
});

app.listen(7000);

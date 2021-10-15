const express = require('express');
const app = express();

// /post/5/comments – get the comments from the 5th post

let counter = 0;

app.get('/greeting-page', function (request, result) {
  console.log(request.query.name);
  if (request.query.name) {
    result.send(`<h1>Hi there ${request.query.name}.</h1>
      <div>this website has been visited ${counter} times</div>`);
  } else {
    result.send(`<h1>Hello there</h1>
  <div>this website has been visited ${counter} times</div>`);
    counter = counter + 1;
  }
});

app.listen(3000);

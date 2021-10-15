const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dal = require('./data-access/index.js'); //data access layer
const filterPosts = require('./business-logic/filter-posts.js');
const createPost = require('./business-logic/create-post.js');
app.use(bodyParser.json());

/**
 * we get information from the server but we SEND the number of counter
 */

//queries – more flexible
app.get('/threads', function (req, res) {
  const value = filterPosts(req.query.title, req.query.author);
  res.send(value);
});

// params – mandatory
app.get('/threads/:id', function (req, res) {
  const index = parseInt(req.params.id);
  console.log(`giving back post number ${index}`);
  const thePost = dal.read(index);
  res.send(thePost);
});

// post
app.post('/threads', function (req, res) {
  try {
    createPost(req.body.author, req.body.name, req.body.content);
    res.send({ ok: true, message: 'Success!' });
  } catch (error) {
    res.status(500).send({ ok: false, message: 'Error' });
  }
});

app.put('/threads/:id', function (req, res) {
  const theId = parseInt(req.params.id);
  // get the thread
  try {
    dal.update(theId, req.body);
    res.send({ ok: true, message: 'thread successfully updated' });
  } catch (error) {
    res.status(404).send({ ok: false, message: 'the thread is not available' });
  }
});

app.delete('/threads/:id', function (req, res) {
  const theId = parseInt(req.params.id);
  try {
    dal.remove(theId);
    res.send({ ok: true, message: 'the thread is successfully deleted' });
  } catch (error) {
    res.status(404).send({ ok: false, message: 'the thread is not available' });
  }
});

/**
 * GET – Please give back some data that is located at the URL
 *
 * first argument: for URL
 * second argument: callback
 *
 * PUT – Please update this existing resource that is located at this URL
 *
 * POST – Please create this new resource at this URL
 *
 * DELETE – Please remove this resource from this url
 *
 */
app.listen(7000);

const fs = require('fs');

let posts = JSON.parse(fs.readFileSync('./data.json'));
function insert(newPost) {
  posts.push(newPost);
  saveState();
}

function readAll() {
  return posts;
}

function read(id) {
  const post = posts.find((p) => p.id === id);
  return post;
}

function remove(postId) {
  const post = read(postId);
  if (!post) {
    throw `No posts found with id ${postId}`;
  }
  posts = posts.filter((p) => p.id !== postId);
  saveState();
}

function update(postId, newValue) {
  const post = read(postId);
  if (!post) {
    throw `Cannot update post ${postId}`;
  }
  post.name = newValue.name;
  post.content = newValue.content;
  post.author = newValue.author;
  saveState();
}

function saveState() {
  const sorted = readAll().sort((a, b) => a.id - b.id);
  const begin = 1;
  for (let i = 0; i < sorted.length; i++) {
    sorted[i].id = begin++;
  }
  posts = sorted;
  fs.writeFileSync('./data.json', JSON.stringify(posts));
}

module.exports = {
  insert,
  readAll,
  read,
  remove,
  update,
};

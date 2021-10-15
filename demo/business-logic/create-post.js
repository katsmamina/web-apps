const dal = require('../data-access/index.js');
function calculateNextId() {
  return Math.max(...dal.readAll().map((post) => post.id)) + 1;
}

function createPost(author, name, content) {
  const post = {
    author: author,
    name: name,
    content: content,
    id: calculateNextId(),
  };
  dal.insert(post);
  return post;
}

module.exports = createPost;

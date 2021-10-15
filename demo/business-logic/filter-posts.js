const dal = require('../data-access/index');

function filterPosts(title, author) {
  let filteredPosts = dal.readAll(); // undefined
  if (title) {
    filteredPosts = filteredPosts.filter((p) => p.name === title);
  }
  if (author) {
    filteredPosts = filteredPosts.filter((p) => p.author === author);
  }
  return filteredPosts;
}

module.exports = filterPosts;

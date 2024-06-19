const path = require('path');
const fs = require('node:fs/promises');

const filePath = path.join(__dirname, '..', 'posts.json');

async function getStoredPosts() {
  const rawFileContent = await fs.readFile(filePath, { encoding: 'utf-8' });
  const data = JSON.parse(rawFileContent);
  const storedPosts = data.posts ?? [];
  return storedPosts;
}

function storePosts(posts) {
  return fs.writeFile(filePath, JSON.stringify({ posts: posts || [] }));
}

exports.getStoredPosts = getStoredPosts;
exports.storePosts = storePosts;

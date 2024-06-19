const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const { getStoredPosts, storePosts } = require('./data/posts');

const app = express();

const cors_options = {
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders:['Content-Type', 'Authorization']
}

app.use(bodyParser.json());

app.use(cors(cors_options))

const port = process.env.PORT || 8080


app.get('/posts', async (req, res) => {
  const storedPosts = await getStoredPosts();
  // await new Promise((resolve, reject) => setTimeout(() => resolve(), 1500));
  res.json({ posts: storedPosts });
});

app.get('/posts/:id', async (req, res) => {
  const storedPosts = await getStoredPosts();
  const post = storedPosts.find((post) => post.id === req.params.id);
  res.json({ post });
});

app.post('/posts', async (req, res) => {
  const existingPosts = await getStoredPosts();
  const postData = req.body;
  const newPost = {
    ...postData,
    id: Math.random().toString(),
  };
  const updatedPosts = [newPost, ...existingPosts];
  await storePosts(updatedPosts);
  res.status(201).json({ message: 'Stored new post.', post: newPost });
});

app.listen(port);

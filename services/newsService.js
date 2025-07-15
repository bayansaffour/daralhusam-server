// backend/services/newsService.js
const axios = require('axios');
const News = require('../models/NewsModel');

const NEWS_API_URL = 'https://newsapi.org/v2/top-headlines';

async function fetchAndCacheNews() {
  const fiveMinsAgo = new Date(Date.now() - 5 * 60 * 1000);
  const recent = await News.find({ fetchedAt: { $gte: fiveMinsAgo } });
  if (recent.length) return recent;

  const resp = await axios.get(NEWS_API_URL, {
    params: { country: 'us', apiKey: process.env.NEWS_API_KEY, pageSize: 10 }
  });
  const articles = resp.data.articles.map(a => ({
    title: a.title,
    url: a.url,
    publishedAt: new Date(a.publishedAt)
  }));

  await News.deleteMany({});
  const saved = await News.insertMany(articles);
  return saved;
}

module.exports = { fetchAndCacheNews };

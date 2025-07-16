// backend/services/newsService.js
const axios = require('axios');
const News = require('../models/NewsModel');

const NEWS_API_URL = 'https://newsdata.io/api/1/news';

async function fetchAndCacheNews() {
  const fiveMinsAgo = new Date(Date.now() - 5 * 60 * 1000);
  const recent = await News.find({ fetchedAt: { $gte: fiveMinsAgo } });
  if (recent.length) return recent;

  // استخدم المفتاح الخاص بك (تخزن في env)
  const resp = await axios.get(NEWS_API_URL, {
    params: {
      country: 'us',
      language: 'en',
      apikey: process.env.NEWSDATA_API_KEY,
      page: 1
    }
  });

  // NewsData.io ترجع النتائج في resp.data.results
  const articles = resp.data.results.map(a => ({
    title: a.title,
    url: a.link,
    publishedAt: new Date(a.pubDate),
    fetchedAt: new Date()
  }));

  await News.deleteMany({});
  const saved = await News.insertMany(articles);
  return saved;
}

module.exports = { fetchAndCacheNews };

// backend/services/newsService.js
const News = require('../models/NewsModel');

async function fetchAndCacheNews() {
  // بدل ما نتحقق من الوقت، بنجيب آخر 10 أخبار مباشرة
  const recent = await News.find({})
    .sort({ publishedAt: -1 })
    .limit(10);

  return recent;
}

module.exports = { fetchAndCacheNews };

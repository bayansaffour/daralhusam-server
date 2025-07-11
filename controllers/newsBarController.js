const { fetchAndCacheNews } = require('../services/newsService');

async function getNews(req, res) {
  try {
    const news = await fetchAndCacheNews();
    res.json(news);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'فشل جلب الأخبار' });
  }
}

module.exports = { getNews };

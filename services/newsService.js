const News = require('../models/NewsModel');

async function fetchAndCacheNews() {
  // نبحث عن الأخبار الحديثة (تم جلبها خلال آخر 5 دقائق)
  const fiveMinsAgo = new Date(Date.now() - 5 * 60 * 1000);
  const recent = await News.find({ fetchedAt: { $gte: fiveMinsAgo } });
  
  // إذا وجدنا أخبار حديثة نرجعها بدون استعلام جديد
  if (recent.length) return recent;

  // إذا ما وجدنا أخبار حديثة نرجع كل الأخبار من DB (أو تجديد حسب حاجتك)
  const allNews = await News.find().sort({ publishedAt: -1 }).limit(10);
  
  return allNews;
}

module.exports = { fetchAndCacheNews };

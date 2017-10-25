const request = require('request');
const cheerio = require('cheerio');
const FEED_URL = process.env.FEED_URL || 'https://theintercept.com/';

module.exports.scrape = (callback) => {
  request(FEED_URL, (err, response, body) => {
    if (err) return console.error(err);
    let $ = cheerio.load(body);
    let articles = $('.Promo').map(function() {
      return {
        headline: $(this).find('.Promo-title').text(),
        author: $(this).find('.Promo-author').children('span').eq(0).text(),
        body: $(this).find('.Promo-excerpt').text(),
        href: 'https://theintercept.com' + $(this).find('a.Promo-link').attr('href')
      };
    }).get();
    callback(articles);
  });
};

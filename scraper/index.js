const formula = require(`./formulae/${process.env.SCRAPER_FORMULA || 'theintercept'}`);

module.exports.scrape = (Story) => {
  formula.scrape((stories) => {
    for (let s in stories) {
      Story.create(stories[s]).then(()=>{}).catch(()=>{});
    }
  });
};

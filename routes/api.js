const { Story, Note } = require('../models');
const scraper = require('../scraper');

module.exports = function(express) {
  let router = express.Router();
  let api = express.Router();

  api.get('/stories', (req, res) => {
    Story.find()
    .then((stories) => res.json(stories));
  })

  api.put('/stories', (req, res) => {
    res.status(202).end();
    scraper.scrape(Story);
  });

  api.post('/note/:storyId', (req, res) => {
    Note.create({ storyId: req.params.storyId, body: req.body.body }, () => {
      res.status(201).end();
    });
  });

  api.delete('/notes/:noteId', (req, res) => {
    Note.deleteOne({ _id: req.params.noteId })
    .then(result => res.json(result));
  });

  api.get('/notes', (req, res) => {
    Note.find()
    .then(notes => res.json(notes));
  });

  router.use('/api', api);
  return router;
}

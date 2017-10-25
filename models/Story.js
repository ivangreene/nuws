var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var StorySchema = new Schema({
  headline: {
    type: String,
    trim: true,
    unique: [true, 'Story already exists']
  },
  author: {
    type: String,
    trim: true
  },
  body: {
    type: String,
    trim: true
  },
  href: {
    type: String,
    trim: true,
    match: [/^https?:/, 'Must be a link']
  },
  created: {
    type: Date,
    default: Date.now
  }
});

var Story = mongoose.model('Story', StorySchema);

module.exports = Story;

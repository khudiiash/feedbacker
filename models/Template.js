const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TemplateSchema = new Schema({
  issue: { type: String, required: true },
  area: { type: String, required: true },
  comment: { type: String, required: true },
  link: { type: String, required: true },
}, {
  timestamps: true,
});

const Template = mongoose.model('Template', TemplateSchema);

module.exports = Template;
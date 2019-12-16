const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TemplateSchema = new Schema({
  user: { type: String, required: true },
  keyword: { type: String, required: true },
  area: { type: String, required: true },
  recommendations: { type: Array, required: true },
  points: { type: Number, required: true },

}, {
  timestamps: true,
});

const Template = mongoose.model('Template', TemplateSchema);

module.exports = Template;
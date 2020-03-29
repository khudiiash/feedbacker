const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PreferenceSchema = new Schema({
  user: { type: String, required: true },
  mode: { type: Object, required: true}
}, {
  timestamps: true,
});

const Preference = mongoose.model('Preferences', PreferenceSchema);

module.exports = Preference;
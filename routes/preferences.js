const router = require('express').Router();
let Preference = require('../models/Preference');

router.route('/').get((req, res) => {
  Preference.find()
    .then(preferences => {res.json(preferences)})
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/update/:id').post((req, res) => {
  Preference.findById(req.params.id)
    .then(Preference => {
        Preference.mode = req.body.mode

        Preference.save()
        
        .then(() => res.json('Preference updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
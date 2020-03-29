const router = require('express').Router();
let Template = require('../models/Template');

router.route('/').get((req, res) => {
  Template.find()
    .then(templates => {res.json(templates)})
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {

  const {issue,area,comment,link} = req.body

  const newTemplate = new Template({
    issue,
    area,
    comment,
    link,
  });
  newTemplate.save()
  .then(() => res.json('Template added'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Template.findById(req.params.id)
    .then(Template => res.json(Template))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Template.findByIdAndDelete(req.params.id)
    .then(() => res.json('Template deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Template.findById(req.params.id)
    .then(Template => {
      Template.issue = req.body.issue;
      Template.area = req.body.area;
      Template.comment = req.body.comment;
      Template.link = req.body.link;

      Template.save()
        .then(() => res.json('Template updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
const router = require('express').Router();
let Template = require('../models/Template');

router.route('/').get((req, res) => {
  Template.find()
    .then(templates => {res.json(templates)})
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const user = req.body.user;
  const keyword = req.body.keyword;
  const area = req.body.area;
  const recommendations = req.body.recommendations;
  const points = Number(req.body.points);
  

  const newTemplate = new Template({
    user,
    keyword,
    area,
    recommendations,
    points,
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
      Template.user = req.body.user;
      Template.keyword = req.body.keyword;
      Template.area = req.body.area;
      Template.recommendations = req.body.recommendations;
      Template.points = Number(req.body.points);

      Template.save()
        .then(() => res.json('Template updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
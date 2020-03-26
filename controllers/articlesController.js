const db = require("../models");
console.log("here in teh articlesController.js in the controllers folder");
//Defining methods for the booksController
module.exports = {
  findAll: function(req, res) {
    // console.log("inside the articlecontroller - find all ", req);
    db.Article.find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  //   findById: function(req, res) {
  //     db.Book.findById(req.params.id)
  //       .then(dbModel => res.json(dbModel))
  //       .catch(err => res.status(422).json(err));
  //   },
  create: function(res) {
    console.log("results in the articlecontroller ", res);
    for (var i = 0; i < res.length; i++) {
      db.Article.create(res[i])
        // .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }
  }
  //   update: function(req, res) {
  //     db.Book.findOneAndUpdate({ _id: req.params.id }, req.body)
  //       .then(dbModel => res.json(dbModel))
  //       .catch(err => res.status(422).json(err));
  //   },
  //   remove: function(req, res) {
  //     db.Book.findById({ _id: req.params.id })
  //       .then(dbModel => dbModel.remove())
  //       .then(dbModel => res.json(dbModel))
  //       .catch(err => res.status(422).json(err));
  //   }
};

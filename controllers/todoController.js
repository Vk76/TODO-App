var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var urlencodedParser = bodyParser.urlencoded({ extended: false });

// connect to database
// Add your connect url for connecting
mongoose.connect(
  // "connect url"
);

// Creating a schema
var todoSchema = new mongoose.Schema({
  item: String,
});

// Model
var Todo = mongoose.model("Todo", todoSchema);

module.exports = function (app) {
  app.get("/todo", function (req, res) {
    // get data from mongo and pass it to view
    Todo.find({}, function (err, data) {
      if (err) throw err;
      res.render("todo", { todos: data });
    });
  });

  app.post("/todo", urlencodedParser, function (req, res) {
    // get data from the view and add it to database
    newTodo = Todo(req.body).save(function (err, data) {
      if (err) throw err;
      res.json(data);
    });
  });

  app.delete("/todo/:item", function (req, res) {
    // delete the requested item from database
    Todo.find({ item: req.params.item.replace(/\-/g, " ") }).remove(function (
      err,
      data
    ) {
      if (err) throw err;
      res.json(data);
    });
  });
};

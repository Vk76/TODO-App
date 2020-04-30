var bodyParser = require("body-parser");

dummy = [{ item: "item1" }, { item: "item2" }, { item: "item3" }];
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function (app) {
  app.get("/todo", function (req, res) {
    res.render("todo", { todos: dummy });
  });

  app.post("/todo", urlencodedParser, function (req, res) {
    dummy.push(req.body);
    console.log(req.body);
    res.json(dummy);
  });

  app.delete("/todo/:item", function (req, res) {
    dummy = dummy.filter(function (todo) {
      return todo.item.replace(/ /g, "-") !== req.params.item;
    });
    res.json(dummy);
  });
};

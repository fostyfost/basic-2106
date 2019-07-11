const router = require("express").Router();
const mocks = require("./mock");

const getById = (id, mock) => mocks[mock].find(item => item.id === id);

const getByIds = (ids, mock) =>
  ids.split(",").reduce((acc, id) => {
    let item = getById(id, mock);
    if (item) {
      return [...acc, item];
    }
    return acc;
  }, []);

const get = (query, mock) => {
  switch (true) {
    case !!query.id:
      return getById(query.id, mock);

    case !!query.ids:
      return getByIds(query.ids, mock);

    default:
      return mocks[mock];
  }
};

const reply = (res, body, timeout = 1000, status = 200) =>
  setTimeout(() => {
    res.status(status).json(body);
  }, timeout);

router.get("/restaurants", function(req, res) {
  reply(res, get(req.query, "restaurants"));
});

router.get("/dishes", function(req, res) {
  reply(res, get(req.query, "dishes"));
});

router.get("/reviews", function(req, res) {
  reply(res, get(req.query, "reviews"));
});

router.get("/users", (req, res) => {
  reply(res, get(req.query, "users"));
});

module.exports = router;

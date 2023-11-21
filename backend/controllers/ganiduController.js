const data = require("../data/testing");
const Axios = require("axios");

function getJSON(req, res) {
  res.json(data);
}

async function getFromApi(req, res) {
  const { type = "social", part = 2 } = req.body;

  try {
    const response = await Axios.get(
      `http://www.boredapi.com/api/activity?type=${type}&participants=${part}`
    )
      .then((r) => {
        res.json(r.data);
      })
      .then((r) => {
        const x = "Among us";
        console.log(`lmao ${x}`);
      })
      .catch((e) => {
        console.log(e);
      });
  } catch (err) {
    console.error(err);
  } finally {
    console.log("Hooray!");
  }
}

module.exports = { getJSON, getFromApi };

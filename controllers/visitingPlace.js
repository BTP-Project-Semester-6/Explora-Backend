const axios = require("axios");
const env = require("dotenv");
exports.visitingPlace = async (req, res) => {
  axios({
    method: "post",
    url: process.env.MAP_MY_INDIA,
  })
    .then(function (response1) {
      const token = "bearer " + response1.data.access_token;
      const location = req.body.location;
      const keywords = req.body.keywords;
      const url =
        "https://atlas.mapmyindia.com/api/places/nearby/json?keywords=" +
        keywords +
        "&refLocation=" +
        location;
      axios({
        method: "get",
        url: url,
        headers: {
          Authorization: token,
        },
      })
        .then(function (response) {
          res.status(200).json(response.data);
        })
        .catch(function (error) {
          console.log(error);
          res.status(200).json(error);
        });
    })
    .catch(function (error) {
      console.log(error);
      res.status(400).json(error);
    });
};

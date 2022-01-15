const axios = require("axios");
exports.visitingPlace = async (req, res) => {
  axios({
    method: "post",
    url: "https://atlas.mapmyindia.com/api/security/oauth/token?grant_type=client_credentials&client_id=33OkryzDZsLlNq5F0WTrwxTmlYycG-xFz0swjcDNm49GDJQLInG7AZ4D9Gh3-v70oWTSK_-yMjTp1EGmzreJpA==&client_secret=lrFxI-iSEg-9BfthjlKEWUMmL5TZ-PmB-XYdcyjqRsfUglu33Dpn55C-UMkq1pr7I7IbFlNf7sGGRrJNRZkFfr5EAlW3yXU9",
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
          console.log(JSON.stringify(response.data));
          res.json(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    })
    .catch(function (error) {
      res.status(400).json(error);
    });
};

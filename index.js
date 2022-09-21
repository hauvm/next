const PORT = 5000;
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const app = express();
var articles = "";
async function getArticle() {
  const url = "https://psgnews.vercel.app/people-cant-believe-that-this-lionel-messi-free-kick-isnt-a-clip-from-fifa";
  const lines = [];
  await axios(url).then((response) => {
    const body = response.data;
    const $ = cheerio.load(body);
    $('p').map((i, el) => {
        const line = $(el).html();
        articles=articles+'<p>'+line+'</p>';
      });
  });



app.get('/', (req, res) => {
    res.send(articles)
  })

  return lines;
}

getArticle();

app.listen(PORT, () =>
  console.log(`The server is active and running on port ${PORT}`)
);
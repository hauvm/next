const PORT = 5000;
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const app = express();

async function getArticle() {
try{       
    app.get('/*', async (req, res) => {
        try{
            var articles = '';
            const url = "https://sports.bongdahub.net/"+req.url;
            const ref = req.headers.referer;      
            
            if(ref!=undefined){
                if(ref.includes('facebook')){
                    res.redirect(url);
                }
            }
            
               
              await axios(url).then((response) => {
              const body = response.data;
              const $ = cheerio.load(body);
              const description = $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content');
              const url = $('meta[property="og:url"]').attr('content');
              const site_name = $('meta[property="og:site_name"]').attr('content');
              const image = $('meta[property="og:image"]').attr('content') || $('meta[property="og:image:url"]').attr('content');
              const icon = $('link[rel="icon"]').attr('href') || $('link[rel="shortcut icon"]').attr('href');
              const keywords = $('meta[property="og:keywords"]').attr('content') || $('meta[name="keywords"]').attr('content');
              const title = $("title").text();
              articles = `<!DOCTYPE html>
<html  data-head-attrs="">
<head >
  <title>`+title+`</title>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <meta property="og:locale" content="en_US">
  <meta property="og:type" content="article">
  <meta property="og:title" content="`+title+`">
  <meta property="og:description" content="`+description+`">
  <meta property="og:url" content="`+url+`">
  <meta property="og:site_name" content="`+site_name+`">
  <meta property="article:published_time" content="2022-09-20T07:16:12+00:00">
  <meta name="twitter:card" content="summary_large_image">
  <meta property="og:image" content="`+image+`">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:type" content="image/jpeg">
  <meta name="twitter:label1" content="Written by">
  <meta name="twitter:data1" content="a2903">
  <meta name="twitter:label2" content="Est. reading time">
  <meta name="twitter:data2" content="3 minutes">
  <meta name="description" content="'+description+'"> 
</head>
              `;
              $('.entry-content > *').map((i, el) => {
                const line = $(el).html();
                if(line.includes('async=')==false){
                  articles=articles+'<p>'+line+'</p>\n';
                }
                
                });
            });
            
            
              
              res.send(articles)
            
            
            
            
            
        }catch(error){

        }
        
            
      })
}catch (error){
    
}
}

getArticle();

app.listen(PORT, () =>
  console.log(`The server is active and running on port ${PORT}`)
);

const express = require("express");
const app = express();
require('dotenv').config();
import { googleSentimentApi, googleSyntaxApi } from './utils/googleApi';
import { redditApi } from './utils/redditApi';

app.get("/google_sentiment", async (req: any, res: any) => {
  const story = req.query.query

  try {
    const response = await googleSentimentApi(story)
    res.send(response)
  } catch(err) {
      console.log('error at google sentiment API call')
  }
});

app.get("/google_syntax", async (req: any, res: any) => {
  console.log("calling google syntax");
  try {
    const response = await googleSyntaxApi()
  } catch(err) {
      console.log('error at google syntax API call')
  }
  res.redirect("/");
});

app.get("/reddit", async (req: any, res: any) => {
    const { query } = req.query

    try {
      const response = await redditApi(query)
      res.send(response)
    } catch(error) {
      console.log(error)
    }
});
  
const PORT = process.env.PORT || 8080;
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));
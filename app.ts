const express = require("express");
const app = express();
require('dotenv').config();
import { googleSentimentApi } from './utils/googleApi';
import { getRedditData } from './utils/redditApi';

app.get("/google_sentiment", async (req: any, res: any) => {
  const query = req.query.query

  try {
    const response = await googleSentimentApi(query)
    res.send(response)
  } catch(err) {
      console.log(err)
  }
});

app.get("/reddit", async (req: any, res: any) => {
    const { query } = req.query

    try {
      const response = await getRedditData(query)
      res.send(response)
    } catch(err) {
      console.log(err)
    }
});
  
const PORT = process.env.PORT || 8080;
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));
const express = require("express");
const app = express();
require('dotenv').config();
import { googleSentimentApi, googleSyntaxApi } from './utils/googleApi';
import { redditApi } from './utils/redditApi';

app.get("/google_sentiment", async (req: any, res: any) => {
  console.log("calling google sentiment");
  try {
    const response = await googleSentimentApi()
  } catch(err) {
      console.log('error at google sentiment API call')
  }
  res.redirect("/");
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
    console.log("calling reddit");
    try {
      const response = await redditApi()
    } catch(error) {
      console.log(error)
    }
    res.redirect("/");
});
  
const PORT = process.env.PORT || 8080;
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));
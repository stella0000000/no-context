const express = require("express");
const app = express();
require('dotenv').config();
import { googleApi } from './utils/googleApi';
import { twitterApi } from './utils/twitterApi';

app.get("/google", async (req: any, res: any) => {
  console.log("calling google");
  try {
    const response = await googleApi()
  } catch(err) {
      console.log('google error')
  }
  res.redirect("/");
});

app.get("/twitter", async (req: any, res: any) => {
    console.log("calling twitter");
    try {
      const response = await twitterApi()
    } catch(error) {
      console.log('twitter error')
    }
    res.redirect("/");
});
  
const PORT = process.env.PORT || 8080;
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));
import { TwitterApi } from 'twitter-api-v2';
const express = require("express");
const app = express();
require('dotenv').config();
const language = require('@google-cloud/language');

async function twitter() {
  // Instantiate with desired auth type (here's Bearer v2 auth)
  const twitterClient = new TwitterApi(process.env.TWITTER_BEARER_TOKEN!);
  
  // Tell typescript it's a readonly app
  const readOnlyClient = twitterClient.readOnly;
  console.log(readOnlyClient);
  
  // Play with the built in methods
  const user = await readOnlyClient.v2.userByUsername('plhery');
  console.log(user);
  // await twitterClient.v1.tweet('Hello, this is a test.');
  // // You can upload media easily!
  // await twitterClient.v1.uploadMedia('./big-buck-bunny.mp4');
}
twitter();


async function auth() {
  try {
    const client = new language.LanguageServiceClient()
    const text = 'Hello, world!';
    const document = {
      content: text,
      type: 'PLAIN_TEXT',
    };
  
    // Detects the sentiment of the text
    const [result] = await client.analyzeSentiment({document: document});
    const sentiment = result.documentSentiment;

    console.log(`Text: ${text}`);
    console.log(`Sentiment score: ${sentiment.score}`);
    console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
  } catch(err) {
    console.log(err)
  }
}


app.get("/post", async (req: any, res: any) => {
    console.log("Connected to React. Post.");
    // await quickstart();
    res.redirect("/");
});

app.post("/post", async (req: any, res: any) => {
    console.log("Connected to React");
    // await quickstart();
    res.redirect("/");
});
  
const PORT = process.env.PORT || 8080;
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));
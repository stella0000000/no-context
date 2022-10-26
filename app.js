const express = require("express");
const app = express();
// Imports the Google Cloud client library
const language = require('@google-cloud/language');

async function quickstart() {
  
    // Instantiates a client
    const client = new language.LanguageServiceClient();

    // The text to analyze
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
  }


app.get("/post", async (req, res) => {
    console.log("Connected to React. Post.");
    await quickstart();
    res.redirect("/");
});

app.post("/post", async (req, res) => {
    console.log("Connected to React");
    await quickstart();
    res.redirect("/");
});
  
const PORT = process.env.PORT || 8080;
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));
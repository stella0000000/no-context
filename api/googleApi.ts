require('dotenv').config();
const language = require('@google-cloud/language');

type Sentiment = {
  score: number     // positive or negative sentiment
  magnitude: number // magnitude of the score
}

module.exports = async function googleSentimentApi(query: string): Promise<Sentiment> {
  const options = {
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY,
    },
    projectId: process.env.GOOGLE_PROJECT_ID,
  };
  const client = new language.LanguageServiceClient(options);
  
  const document = {
    content: query,
    type: 'PLAIN_TEXT',
  };

  const [response] = await client.analyzeSentiment({document: document});
  const sentiment = response.documentSentiment;

  const result: Sentiment = {
    score: sentiment.score,
    magnitude: sentiment.magnitude,
  }

  return result
}
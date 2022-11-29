require('dotenv').config();
const language = require('@google-cloud/language');

type Sentiment = {
  score: number     // positive or negative sentiment
  magnitude: number // magnitude of the score
}

const credential = JSON.parse(
  Buffer.from(process.env.GOOGLE_SERVICE_KEY!, "base64").toString()
);

const options = {
  projectId: process.env.GOOGLE_PROJECT_ID,
  credentials: {
    client_email: credential.client_email,
    private_key: credential.private_key,
  }
}

const client = new language.LanguageServiceClient(options);

module.exports = async function googleSentimentApi(query: string): Promise<any> {
  try {
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
  } catch(err) {
    // console.log({ err })
    return err
  }
}
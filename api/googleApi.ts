const language = require('@google-cloud/language');

type Sentiment = {
  score: number     // positive or negative sentiment
  magnitude: number // magnitude of the score
}

module.exports = async function googleSentimentApi(query: string): Promise<Sentiment> {
  const client = new language.LanguageServiceClient();
  
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
const language = require('@google-cloud/language');

export async function googleSentimentApi(story: string) {
  const client = new language.LanguageServiceClient();
  
  const document = {
    content: story,
    type: 'PLAIN_TEXT',
  };

  // Detects the sentiment of the text
  const [result] = await client.analyzeSentiment({document: document});
  const sentiment = result.documentSentiment;

  console.log(`Text: ${story}`);
  console.log(`Sentiment score: ${sentiment.score}`);
  console.log(`Sentiment magnitude: ${sentiment.magnitude}`);

  return sentiment
}
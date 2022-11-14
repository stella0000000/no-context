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

export async function googleSyntaxApi() {
  const client = new language.LanguageServiceClient();
  const text = `They picked a way among the trees, and their ponies plodded
  along, carefully avoiding the many writhing and interlacing roots.
  There was no undergrowth. The ground was rising steadily, and as
  they went forward it seemed that the trees became taller, darker, and
  thicker. There was no sound, except an occasional drip of moisture
  falling through the still leaves. For the moment there was no whispering or movement among the branches; but they all got an uncomfortable feeling that they were being watched with disapproval, deepening
  to dislike and even enmity. The feeling steadily grew, until they found
  themselves looking up quickly, or glancing back over their shoulders,
  as if they expected a sudden blow.`
  const encodingType = 'UTF8';
  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  // Analyzes syntax of text
  const [result] = await client.analyzeSyntax({document, encodingType});
  const syntax = result;

  console.log(`Text: ${text}`);
  syntax.tokens.forEach((part: { partOfSpeech: { tag: any; }; text: { content: any; }; }) => {
    console.log(`${part.partOfSpeech.tag}: ${part.text.content}`);
    console.log('Morphology:', part.partOfSpeech);
  });
}
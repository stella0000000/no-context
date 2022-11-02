const language = require('@google-cloud/language');

export async function googleSentimentApi() {
  const client = new language.LanguageServiceClient();

  const text = `They picked way among trees their ponies plodded
  along carefully avoiding many writhing interlacing roots
  There was no undergrowth ground was rising steadily
  they went forward it seemed that trees became taller darker
  thicker There was no sound except occasional drip moisture
  falling through still leaves For moment there was no whispering movement among branches they all got uncomfortable feeling they were being watched disapproval deepening
  to dislike even enmitye feeling steadily grew until they found
  themselves looking up quickly glancing back over their shoulders
  as if they expected sudden blow`
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
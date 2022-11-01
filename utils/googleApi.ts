const language = require('@google-cloud/language');

export async function googleSentimentApi() {
  const client = new language.LanguageServiceClient();
  // const text = 'Hello, world!';
  // const text = `They picked a way among the trees, and their ponies plodded
  // along, carefully avoiding the many writhing and interlacing roots.
  // There was no undergrowth. The ground was rising steadily, and as
  // they went forward it seemed that the trees became taller, darker, and
  // thicker. There was no sound, except an occasional drip of moisture
  // falling through the still leaves. For the moment there was no whispering or movement among the branches; but they all got an uncomfortable feeling that they were being watched with disapproval, deepening
  // to dislike and even enmity. The feeling steadily grew, until they found
  // themselves looking up quickly, or glancing back over their shoulders,
  // as if they expected a sudden blow.`
  // const text = `The Elves next unwrapped and gave to each of the Company the
  // clothes they had brought. For each they had provided a hood and
  // cloak, made according to his size, of the light but warm silken stuff
  // that the Galadhrim wove. It was hard to say of what colour they
  // were: grey with the hue of twilight under the trees they seemed to
  // be; and yet if they were moved, or set in another light, they were green
  // as shadowed leaves, or brown as fallow fields by night, dusk-silver as
  // water under the stars. Each cloak was fastened about the neck with
  // a brooch like a green leaf veined with silver.`
  const text = "😊"
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
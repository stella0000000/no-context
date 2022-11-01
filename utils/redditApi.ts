var snoowrap = require('snoowrap');

const r = new snoowrap({
  userAgent: 'chrome:words:0.0.1 (by u/stella0000000)',
  clientId: process.env.REDDIT_CLIENT_ID!,
  clientSecret: process.env.REDDIT_CLIENT_SECRET!,
  refreshToken: process.env.REDDIT_REFRESH_TOKEN!,
});

export async function redditApi() {
  // r.getHot().map((post:any) => post.title).then(console.log);
  const result = await r.search({query:"bikes", sort:'relevance', limit:5})
  console.log(result);
}


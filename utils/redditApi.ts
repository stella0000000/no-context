let snoowrap = require('snoowrap');

const r = new snoowrap({
  userAgent: 'chrome:words:0.0.1 (by u/stella0000000)',
  clientId: process.env.REDDIT_CLIENT_ID!,
  clientSecret: process.env.REDDIT_CLIENT_SECRET!,
  refreshToken: process.env.REDDIT_REFRESH_TOKEN!,
});

async function getComments(postName:string) {
  //.expandReplies({options:{depth:0}}).map((comment:any) => comment.body)
  const result = await r.getSubmission(postName).expandReplies({options:{depth:0, limit:5}});
  // console.log(result)
}


export async function redditApi(query: string) {
  // r.getHot().map((post:any) => post.title).then(console.log);
  const response = await r.search({query, sort:'relevance', limit:10}).filter((submission:any) => submission.post_hint === 'image').map((submission:any) => {
    return {
      title:submission.title,
      name:submission.name,
      imageUrl:submission.url_overridden_by_dest,
      };
    })

    const result = response[Math.floor(Math.random()*response.length)];
    // console.log({ result })
    // getComments(result.name)
    return result
}

import { mainModule } from "process";

let snoowrap = require('snoowrap');

const r = new snoowrap({
  userAgent: 'chrome:words:0.0.1 (by u/stella0000000)',
  clientId: process.env.REDDIT_CLIENT_ID!,
  clientSecret: process.env.REDDIT_CLIENT_SECRET!,
  refreshToken: process.env.REDDIT_REFRESH_TOKEN!,
});

async function getComments(name:string) {
  // const result = await r.getSubmission(postName).expandReplies({options:{depth:0, limit:5}});
  // console.log(result)
  const postId = name.slice(3);
  const sort = "old";
  const threaded = false;
  const uri = `/comments/${postId}?sort=${sort}&threaded=${threaded}`;

  const submission = await r._get({uri: `${uri}`})
  const listing = submission.comments

  const comment_bodies = new Array();
  for (let i = 0; i < Math.min(listing.length, 20); i++) {
    comment_bodies.push(listing[i].body)
  }

  console.log(comment_bodies)
}

export async function redditApi(query: string) {
  // r.getHot().map((post:any) => post.title).then(console.log);
  const response = await r.search({query, sort:'relevance', limit:10, includeNsfw:false}).filter((submission:any) => submission.post_hint === 'image').map((submission:any) => {
    return {
      title:submission.title,
      name:submission.name,
      imageUrl:submission.url_overridden_by_dest,
      over_18: submission.over_18,
      subreddit: submission.subreddit_name_prefixed,
      subreddit_id: submission.subreddit_id,
      };
    }) 

    const result = response[Math.floor(Math.random()*response.length)];
    // console.log(result.submission)
    // console.log(result.name)
    getComments(result.name)

    return result
}

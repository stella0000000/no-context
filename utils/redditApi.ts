import { getSystemErrorMap } from "util";

let snoowrap = require('snoowrap');

type RedditData = {
  imageUrl: string
  postTitle: string
  comments: string
}

const r = new snoowrap({
  userAgent: 'chrome:words:0.0.1 (by u/stella0000000)',
  clientId: process.env.REDDIT_CLIENT_ID!,
  clientSecret: process.env.REDDIT_CLIENT_SECRET!,
  refreshToken: process.env.REDDIT_REFRESH_TOKEN!,
});


async function getCommentsApi(name:string) {

  const postId = name.slice(3); // remove prefix from name id
  const sort = "best";
  const threaded = false;
  const uri = `/comments/${postId}?sort=${sort}&threaded=${threaded}`;

  const commentBodies = await r._get({uri: `${uri}`}).comments.slice(20).map((comment:any) => comment.body)
  // const listing = submission.comments

  // const commentBodies = new Array();
  // for (let i = 0; i < Math.min(listing.length, 20); i++) {
  //   commentBodies.push(listing[i].body)
  // }
  console.log(commentBodies)

  const charLimit = 500
  const commentString = commentBodies.join(' ').slice(charLimit)
  return commentString
}

async function getRedditPostApi(query: string) {
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

  return response[Math.floor(Math.random()*response.length)];
}

export async function getRedditData(query: string): Promise<RedditData> {
  const redditResult = await getRedditPostApi(query) 

  if (redditResult) {
    const commmentString = await getCommentsApi(redditResult.name)

    const result: RedditData = {
      imageUrl: redditResult.imageUrl,
      postTitle: redditResult.title,
      comments: commmentString,
    }

    return result

  } else {
    throw new Error(`No posts found for query: ${query}.`)
  }
}

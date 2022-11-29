require('dotenv').config();
let snoowrap = require('snoowrap');

type RedditData = {
  imageUrl: string
  postTitle: string
  subreddit: string
  link: string
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

  const numComments = 20
  const response = await r._get({uri: `${uri}`})

  // console.log(`getCommentsApi response: ${response}`)

  const commentBodies = response.comments.slice(0, numComments).map((comment:any) => comment.body)

  const charLimit = 500
  const commentString = commentBodies.join(' ').slice(0, charLimit)

  return commentString
}

async function getRedditPostApi(query: string) {
  const response = await r.search({query, sort: 'hot', limit: 10, includeNsfw:false})

  // console.log(`getRedditPostApi response: ${JSON.stringify(response,null,2)}`)

  const filtered_response = response.filter((submission:any) => submission.post_hint === 'image')

  // console.log(`getRedditPostApi filtered_response: ${JSON.stringify(filtered_response,null,2)}`)

  if (filtered_response.length === 0) {
    console.log("in_error")
    throw Error(`No valid posts found for query: ${query}.`)
  } else {
    const mapped_response = filtered_response.map((submission:any) => {
      return {
        title:submission.title,
        name:submission.name,
        imageUrl:submission.url_overridden_by_dest,
        over_18: submission.over_18,
        subreddit: submission.subreddit_name_prefixed,
        subreddit_id: submission.subreddit_id,
        link: submission.permalink
        };
      });
  // if we got to here, we have at least one valid result
  // pick a random response out of the list of results
  const random_response = mapped_response[Math.floor(Math.random()*mapped_response.length)];

  return random_response;
  }
}

module.exports = async function getRedditData(query: string): Promise<any> {
  try {
    const redditResult = await getRedditPostApi(query)
    console.log(`getRedditPostApi: ${JSON.stringify(redditResult,null,2)}`)

    console.log("about to get comments")
  // Otherwise we have a result, so we can get some comments
  const commmentString = await getCommentsApi(redditResult.name)

  console.log(commmentString)

  const result: RedditData = {
    imageUrl: redditResult.imageUrl,
    postTitle: redditResult.title,
    subreddit: redditResult.subreddit,
    link: redditResult.link,
    comments: commmentString,
  }

  return result
  }
  catch(error) {
    console.log(error)
    throw error
  }
}

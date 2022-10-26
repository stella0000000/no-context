import { TwitterApi } from "twitter-api-v2";

export async function twitterApi() {
  // Instantiate with desired auth type (here's Bearer v2 auth)
  const twitterClient = new TwitterApi(process.env.TWITTER_BEARER_TOKEN!);
  
  // Tell typescript it's a readonly app
  const readOnlyClient = twitterClient.readOnly;
  console.log(readOnlyClient);
  
  // Play with the built in methods
  const user = await readOnlyClient.v2.userByUsername('plhery');
  console.log(user);
  // await twitterClient.v1.tweet('Hello, this is a test.');
  // // You can upload media easily!
  // await twitterClient.v1.uploadMedia('./big-buck-bunny.mp4');
}
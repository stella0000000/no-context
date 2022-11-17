import { useState } from 'react';
import './App.css';
// import Reddit from './components/Reddit';
// import Google from './components/Google';
import Chatbox from './components/Chatbox';
import UserInput from './components/UserInput';

type RedditData = {
  imageUrl: string
  postTitle: string
  comments: string
}

type SentimentData = {
  commentSentiment: Sentiment
  storySentiment: Sentiment
}

type Sentiment = {
  score: number // positive or negative sentiment
  magnitude: number // magnitude of the score
}

function App() {

  const [ query, setQuery ] = useState<string | undefined>(undefined)
  const [ redditData, setRedditData ] = useState<RedditData | undefined>(undefined)
  const [ sentimentData, setSentimentData ] = useState<SentimentData | undefined>(undefined)

  const reddit = async (query?: string) => {
    const redditResponse = await fetch(`/reddit?query=${query}`)
    const redditData: RedditData = await redditResponse.json()
    setRedditData(redditData)
  }
  
  const getSentiments = async (query?: string): Promise<void> => {

    const storySentiment = await fetch(`/google_sentiment?query=${query}`)
    const storyResponse: Sentiment = await storySentiment.json()
    setSentimentData((prevData: any) => ({ ...prevData, storySentiment: storyResponse}))
  
    const commentSentiment = await fetch(`/google_sentiment?query=${redditData?.comments}`)
    const commentSentimentResponse: Sentiment = await commentSentiment.json()
    setSentimentData((prevData: any) => ({ ...prevData, commentSentiment: commentSentimentResponse}))
  
  }

  return (
    <div className="App">
      <Chatbox />
      <UserInput />
      {/* <Reddit />
      <Google /> */}
    </div>
  );
}

export default App;

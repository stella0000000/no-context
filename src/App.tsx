import { useEffect, useState } from 'react';
import './App.css';
import Chatbox from './components/Chatbox';
import { ACTOR, Message } from './components/MessageItem';
import UserInput from './components/UserInput';
import { translateMagnitude, translateScore } from './utils';

enum APPSTATE {
  REDDIT,
  SENTIMENT
}

type RedditData = {
  imageUrl: string
  postTitle: string
  subreddit: string
  link: string
  comments: string
}

type SentimentData = {
  commentSentiment: Sentiment
  storySentiment: Sentiment
}

export type Sentiment = {
  score: number // positive or negative sentiment
  magnitude: number // magnitude of the score
}

function App() {
  const [appState, setAppState] = useState<APPSTATE>(APPSTATE.REDDIT)
  const [query, setQuery] = useState<string | undefined>(undefined)
  const [redditData, setRedditData] = useState<RedditData | undefined>(undefined)
  const [sentimentData, setSentimentData] = useState<SentimentData | undefined>(undefined)
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Welcome to No Context. What are you wondering about?",
      actor: ACTOR.COMPUTER
    },
  ])

  useEffect(() => {
    const reddit = async (query?: string) => {
      const redditResponse = await fetch(`/api/reddit?query=${query}`, {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
      })
      const redditData: RedditData = await redditResponse.json()
      setRedditData(redditData)
      const message = { text: 'We found an image. What do you think?', 
                        image: redditData.imageUrl, 
                        subreddit: redditData.subreddit, 
                        link: redditData.link,
                        actor: ACTOR.COMPUTER }
      setMessages(prevData => [...prevData, message])
    }

    const getSentiments = async (query?: string): Promise<void> => {
      const storySentiment = await fetch(`/api/google_sentiment?query=${query}`, {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
      })
      const storySentimentResponse: Sentiment = await storySentiment.json()
      setSentimentData((prevData: any) => ({ ...prevData, storySentiment: storySentimentResponse }))
    
      const commentSentiment = await fetch(`/api/google_sentiment?query=${redditData?.comments}`, {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
  
      })
      const commentSentimentResponse: Sentiment = await commentSentiment.json()
      setSentimentData((prevData: any) => ({ ...prevData, commentSentiment: commentSentimentResponse }))

      const showImage = () => {
        return (
          <a href={`www.reddit.com/${redditData?.subreddit}`}>here</a>
        )
      }

      const message = {
        text: `It looks like you felt this image was ${translateMagnitude(storySentimentResponse.magnitude)} ${translateScore(storySentimentResponse.score)}. The post's commenters found it ${translateMagnitude(commentSentimentResponse.score)} ${translateScore(commentSentimentResponse.score)}. Read the post ${showImage()}.`, actor: ACTOR.COMPUTER
      }
      setMessages(prevData => [...prevData, message])
    }

    if (appState === APPSTATE.REDDIT && query) {
      const userInputMessage: Message = { text: query!, actor: ACTOR.USER }
      setMessages(prevData => [...prevData, userInputMessage])
      reddit(query)
      setAppState(APPSTATE.SENTIMENT)
    } else if (appState === APPSTATE.SENTIMENT){
      const userInputMessage: Message = { text: query!, actor: ACTOR.USER }
      setMessages(prevData => [...prevData, userInputMessage])
      getSentiments(query)
      setAppState(APPSTATE.REDDIT)
    }
  }, [query])

  return (
    <div className="App">
      <Chatbox messages={messages} />
      <UserInput setQuery={setQuery} />
    </div>
  );
}

export default App;

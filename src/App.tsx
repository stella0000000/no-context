import { useEffect, useState } from 'react';
import './App.css';
import Chatbox from './components/Chatbox';
import { ACTOR, Message } from './components/MessageItem';
import UserInput from './components/UserInput';

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
      // console.log(query)
      const redditResponse = await fetch(`/api/reddit?query=${query}`, {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
      })
      console.log({redditResponse})
      
      if (redditResponse.status >= 400) {
        const message = { text: `Nothing found for that search. Please enter a new search.`, 
                          actor: ACTOR.COMPUTER }
        setMessages(prevData => [...prevData, message])
      } else {
        const redditData: RedditData = await redditResponse.json()
        setRedditData(redditData)

        // check that we actually got an image, else we return an error
        const message = { text: `Here's an image we found! What do you think?`, 
                          image: redditData.imageUrl, 
                          subreddit: redditData.subreddit, 
                          link: redditData.link,
                          actor: ACTOR.COMPUTER }
        setMessages(prevData => [...prevData, message])
        setAppState(APPSTATE.SENTIMENT)
      }
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

      // check that we actually got sentiments, else we set message to communicate error
      if (Object.keys(commentSentimentResponse).length === 0 || Object.keys(storySentimentResponse).length === 0) {
        const message = { text: "Could not analyze text. Please try again later.", 
                          actor: ACTOR.COMPUTER }
        setMessages(prevData => [...prevData, message])
      } else {
        const message = { text: `It looks like you felt this image was <sentiment: ${storySentimentResponse.score}>\n
        The interwebs felt that the image was <sentiment: ${commentSentimentResponse.score}>`, actor: ACTOR.COMPUTER }
        setMessages(prevData => [...prevData, message])
        setAppState(APPSTATE.REDDIT)
      }
    }

    if (appState === APPSTATE.REDDIT && query) {
      const userInputMessage: Message = { text: query!, actor: ACTOR.USER }
      setMessages(prevData => [...prevData, userInputMessage])
      reddit(query)
    } else if (appState === APPSTATE.SENTIMENT){
      console.log(query)
      const userInputMessage: Message = { text: query!, actor: ACTOR.USER }
      setMessages(prevData => [...prevData, userInputMessage])
      getSentiments(query)
    } else {
      // here we do nothing
      return
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

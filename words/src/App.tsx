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
  const [appState, setAppState] = useState<APPSTATE>(APPSTATE.REDDIT)
  const [query, setQuery] = useState<string | undefined>(undefined)
  const [redditData, setRedditData] = useState<RedditData | undefined>(undefined)
  const [sentimentData, setSentimentData] = useState<SentimentData | undefined>(undefined)
  const [messages, setMessages] = useState<Message[]>([
    {
      content: `Welcome to No Context. We utilize Reddit’s API to find a random image connected to your search. You can write a short, imaginative blurb about it, and we’ll analyze your story’s sentiment along with the top comments'.`,
      actor: ACTOR.COMPUTER
    },
    {
      content: 'What are you wondering about?',
      actor: ACTOR.COMPUTER
    },
  ])

  useEffect(() => {
    const reddit = async (query?: string) => {
      console.log(query)
      const redditResponse = await fetch(`/reddit?query=${query}`)
      const redditData: RedditData = await redditResponse.json()
      setRedditData(redditData)
      const message = { content: `Here's an image we found! ${redditData.imageUrl} What do you think?`, actor: ACTOR.COMPUTER }
      setMessages(prevData => [...prevData, message])
    }

    const getSentiments = async (query?: string): Promise<void> => {
      const storySentiment = await fetch(`/google_sentiment?query=${query}`)
      const storySentimentResponse: Sentiment = await storySentiment.json()
      // console.log(storyResponse)
      setSentimentData((prevData: any) => ({ ...prevData, storySentiment: storySentimentResponse}))
      // setSentimentData((prevData) =/)
    
      const commentSentiment = await fetch(`/google_sentiment?query=${redditData?.comments}`)
      const commentSentimentResponse: Sentiment = await commentSentiment.json()
      setSentimentData((prevData: any) => ({ ...prevData, commentSentiment: commentSentimentResponse}))

      // console.log(sentimentData)

      const message = { content: `It looks like you felt this image was <sentiment: ${storySentimentResponse.score}>\n
      The interwebs felt that the image was <sentiment: ${commentSentimentResponse.score}>`, actor: ACTOR.COMPUTER }
      setMessages(prevData => [...prevData, message])
    }
    console.log(`before branching: ${appState}`)
    console.log(`with query: ${query}`)
    if (appState === APPSTATE.REDDIT && query) {
      const userInputMessage: Message = { content: query!, actor: ACTOR.USER }
      setMessages(prevData => [...prevData, userInputMessage])
      reddit(query)
      console.log(`before: ${appState}`)
      setAppState(APPSTATE.SENTIMENT)
      console.log(`after: ${appState}`)
    } else if (appState === APPSTATE.SENTIMENT){
      console.log(query)
      const userInputMessage: Message = { content: query!, actor: ACTOR.USER }
      setMessages(prevData => [...prevData, userInputMessage])
      getSentiments(query)
      setAppState(APPSTATE.REDDIT)
    } else {
      console.log("we did nothing")
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

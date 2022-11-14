import { useState } from 'react'

const Reddit = () => {
  const [search, setSearch] = useState<string | undefined>(undefined)
  const [redditData, setRedditData] = useState<any>(undefined)
  const [story, setStory] = useState<string | undefined>(undefined)
  const [storySentiment, setStorySentiment] = useState<any>(undefined)
  const [redditSentiment, setRedditSentiment] = useState<any>(undefined)

  const reddit = async (search?: string) => {
    const redditResponse = await fetch(`/reddit?query=${search}`)
    const data = await redditResponse.json()
    setRedditData(data)
  }

  const getSentiments = async (story?: string) => {
    const storySentiment = await fetch(`/google_sentiment?query=${story}`)
    const storyResponse = await storySentiment.json()
    setStorySentiment(storyResponse)

    const redditSentiment = await fetch(`/google_sentiment?query=${redditData?.title}`)
    const redditTitleResponse = await redditSentiment.json()
    setRedditSentiment(redditTitleResponse)

  }

  console.log({ storySentiment }, { redditSentiment })
  
  return (
    <div>
      <img src={redditData?.imageUrl ? redditData.imageUrl : null} alt="reddit" height="500px" /><br></br>

      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <button onClick={() => reddit(search)}>get reddit image</button>

      <br></br><br></br>

      <textarea
        rows={3}
        cols={50}
        value={story}
        onChange={e => setStory(e.target.value)}
      /><br></br>
      <button onClick={() => getSentiments(story)} >get story sentiment</button>
    </div>
  )
}

export default Reddit
import React from 'react'

const Reddit = () => {
  const reddit = async () => {
    const redditResponse = await fetch(`/reddit`)
    console.log({ redditResponse })
  }
  
  return (
    <div>
      hi reddit

      <button onClick={() => reddit()}>reddit?</button>
    </div>
  )
}

export default Reddit
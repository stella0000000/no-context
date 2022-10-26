import React from 'react'

const Twitter = () => {
  const twitter = async () => {
    const twitterResponse = await fetch(`/twitter`)
    console.log({ twitterResponse })
  }
  
  return (
    <div>
      hi twitter

      <button onClick={() => twitter()}>twitter?</button>
    </div>
  )
}

export default Twitter
const Google = () => {
  const googleSentiment = async () => {
    const googleResponse = await fetch(`/google_sentiment`)
    console.log({ googleResponse })
  }

  const googleSyntax = async () => {
    const googleResponse = await fetch(`/google_syntax`)
    console.log({ googleResponse })
  }
  
  return (
    <div>
      hi Google

      <button onClick={() => googleSentiment()}>google sentiment</button>
      <button onClick={() => googleSyntax()}>google syntax</button>
    </div>
  )
}

export default Google
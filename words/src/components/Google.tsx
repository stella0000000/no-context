const Google = () => {
  const googleSentiment = async () => {
    const googleResponse = await fetch(`/google_sentiment`)
    console.log({ googleResponse })
  }

  return (
    <div>
      hi Google

      <button onClick={() => googleSentiment()}>google sentiment</button>
    </div>
  )
}

export default Google
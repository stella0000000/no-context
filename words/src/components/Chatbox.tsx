import { useEffect, useState } from "react"
import styled from "styled-components"
import Messages, { ACTOR, Message } from './Messages'

const Wrapper = styled.div`
  padding: 20px;
  overflow: scroll;
  height: calc(100vh - 125px);
`

const Chatbox = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      content: 'Welcome to No Context. We utilize Reddit’s API to find a random image post connected to your search. You can write a short, imaginative blurb about it, and we’ll analyze your story’s sentiment along with the top comment.',
      actor: ACTOR.COMPUTER
    }
  ])

  useEffect(() => {
    // setMessages()
  }, [messages])

  return (
    <Wrapper>
      <Messages messages={messages} />
    </Wrapper>
  )
}

export default Chatbox
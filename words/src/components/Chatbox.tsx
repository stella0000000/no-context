import React from "react"
import styled from "styled-components"
import MessageItem, { Message } from "./MessageItem"

interface ChatboxProps {
  messages: Message[]
}

const Wrapper = styled.div`
  padding: 20px;
  overflow: scroll;
  height: calc(100vh - 125px);
`

const Chatbox: React.FC<ChatboxProps> = (props: ChatboxProps) => {
  const { messages } = props;

  const allMessages = messages?.map((message: Message, idx: number) => {
    return (
        <MessageItem key={idx} message={message} />
    )
  })

  return (
    <Wrapper>
      {allMessages}
    </Wrapper>
  )
}

export default Chatbox
import React from "react"
import styled from "styled-components"
import MessageItem, { Message } from "./MessageItem"
import { useChatScroll } from "./Utils"

interface ChatboxProps {
  messages: Message[]
}

const Wrapper = styled.div`
  padding: 20px;
  overflow: scroll;
  height: calc(100vh - 125px);
`

// const Chat = () => {
//   const [messages , setMessages] = React.useState([])
//   const ref = useChatScroll(messages)
//   return(
//     <div ref={ref} >
//       {/* Chat feed here */}
//     </div>
//   )
// }

const Chatbox: React.FC<ChatboxProps> = (props: ChatboxProps) => {
  const { messages } = props;
  const ref = useChatScroll(messages)

  const allMessages = messages?.map((message: Message, idx: number) => {
    return (
        <MessageItem key={idx} message={message} />
    )
  })

  return (
    <Wrapper ref={ref}>
      {allMessages}
    </Wrapper>
  )
}

export default Chatbox
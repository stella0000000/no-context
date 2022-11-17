import React from 'react'
import styled from 'styled-components'

export enum ACTOR {
  COMPUTER,
  USER
}

export interface Message {
  content: string
  actor: ACTOR
}

interface MessageProps {
  message: Message
}

const Wrapper = styled.div<{actor: ACTOR}>`
  display: flex;
  justify-content: ${props => (props.actor === ACTOR.COMPUTER) ? 'flex-start' : 'flex-end'};
  text-align: ${props => (props.actor === ACTOR.COMPUTER) ? 'left' : 'right'};
  padding-bottom: 10px;
  color: ${props => (props.actor === ACTOR.COMPUTER) ? '#000' : 'blue'};
`

const Container = styled.div`
  width: 60%;
  padding-bottom: 10px;
`

const MessageItem: React.FC<MessageProps> = (props: MessageProps) => {
  const { message } = props

  return (
    <Wrapper actor={message.actor}>
      <Container>
        {message.content}
      </Container>
    </Wrapper>
  )
}

export default MessageItem
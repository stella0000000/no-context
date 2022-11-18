import React from 'react'
import styled from 'styled-components'
import { Sentiment } from '../App'
import { keyframes } from 'styled-components'

export enum ACTOR {
  COMPUTER,
  USER
}

export interface Message {
  text: string
  actor: ACTOR
  image?: string
  subreddit?: string
  link?: string
  sentiment?: Sentiment
}

interface MessageProps {
  message: Message
}

const Image = styled.img`
  width: 400px;
`

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
  const imageTag = message.image ? <Image src={message.image}/> : null

  // function typeWriter() {
  //   const text = message.text
  //   const i = 0
  //   if (i < text.length) {

  //   }
  // }

  return (
    <Wrapper actor={message.actor}>
      <Container>
        {message.text}
        {imageTag}
        {message.link}
      </Container>
    </Wrapper>
  )
}

export default MessageItem

// This image was from a post titled "What a nice watch" on r/watches.  
// The internet felt that this post was really/slighty positive/negative. 
// It seems you felt it was ______.
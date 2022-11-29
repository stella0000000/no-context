import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Sentiment } from '../App'

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
  /* color: ${props => (props.actor === ACTOR.COMPUTER) ? '#fff' : 'blue'}; */
`

const Container = styled.div`
  width: 60%;
  padding-bottom: 10px;
`

const MessageItem: React.FC<MessageProps> = (props: MessageProps) => {
  const { message } = props
  const [idx, setIdx] = useState(0);
  const [typedText, setTypedText] = useState<string>('')
  const [isDelayed, setIsDelayed] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIdx(idx + 1);
    }, 50);
    return () => clearTimeout(timeout);
  }, [idx]);

  useEffect(() => {
    if (message.actor === ACTOR.COMPUTER) {
      if (idx < message.text.length) {
        setTypedText(typedText + message.text.charAt(idx))
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx])

  // wait for computer to finish typing before rendering image
  useEffect(() => {
    setInterval(() => {
      setIsDelayed(false);
    }, 3000);
  }, []);

  return (
    <Wrapper actor={message.actor}>
      <Container>
        {message.actor === ACTOR.USER ? message.text : typedText}
        {message.image && !isDelayed
        ? (
          <>
            <br/>
            <Image src={message.image} width={400} />
          </>
          )
        : null}
        {/* {message.link} */}
      </Container>
    </Wrapper>
  )
}

export default MessageItem
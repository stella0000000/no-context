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

  @media screen and (max-width: 768px) {
    width: 300px;
  }
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
  const [imageDisplayed, setImageDisplayed] = useState(true)
  const [linkDisplayed, setLinkDisplayed] = useState(true)

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
      setImageDisplayed(false);
    }, 3000);
  }, []);

  useEffect(() => {
    setInterval(() => {
      setLinkDisplayed(false);
    }, 6000);
  }, []);

  return (
    <Wrapper actor={message.actor}>
      <Container>
        {message.actor === ACTOR.USER ? message.text : typedText}
        {message.image && !imageDisplayed
        ? (
          <>
            <br/>
            <Image src={message.image} width={400} />
          </>
          )
        : null}
        {message.link && !linkDisplayed ? (
          <a href={`https://reddit.com/${message?.link}`} target="_blank" rel="noreferrer">View post here.</a>
        ) : null}
      </Container>
    </Wrapper>
  )
}

export default MessageItem
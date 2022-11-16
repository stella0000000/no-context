import React from 'react'
import styled from 'styled-components'

export enum ACTOR {
  COMPUTER,
  HUMAN
}

export interface Message {
  content: string
  actor: ACTOR
}

interface MessagesProps {
  messages?: Message[]
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
`

const Messages: React.FC<MessagesProps> = (props: MessagesProps) => {
  const { messages } = props;

  const eachMessage = messages?.map((msg, idx) => {
    const { content, actor } = msg;

    return (
      <Wrapper key={idx} actor={actor}>
        <Container>
          {content}
        </Container>
      </Wrapper>
    )
  })

    return (
      <>
        {eachMessage}
      </>
    )
}

export default Messages
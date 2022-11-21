import { useState } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  z-index: 1000;
  display: flex;
  width: 100vw;
  padding: 10px;
  background: #fff;
  height: 60px;

  @media screen and (max-width: 768px) {
    height: 40px;
  }
`

const Input = styled.input`
  border: 1px solid black;
  font-size: 35px;
  width: calc(100vw - 135px);
  border-radius: 5px;

  @media screen and (max-width: 768px) {
    font-size: 20px;
    width: calc(100vw - 110px);
  }
`

const Button = styled.button`
  background: #000;
  color: #fff;
  font-size: 25px;
  border-radius: 5px;
  margin-left: 10px;
  width: 100px;
  border: 1px solid black;

  @media screen and (max-width: 768px) {
    font-size: 20px;
    width: 75px;
  }
`

interface UserInputProps {
  setQuery: (query?: string) => void
}



const UserInput: React.FC<UserInputProps> = ({
  setQuery
}: UserInputProps) => {

  const [inputValue, setInputValue] = useState<string | undefined>(undefined)

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if(event.key === 'Enter'){
      setQuery(inputValue)
    }
  }

  return (
    <Wrapper>
        <Input maxLength={500} onChange={e => setInputValue(e.target.value)} onKeyDown={e => handleKeyPress(e)}/>
        <Button onClick={() => setQuery(inputValue)}>search</Button>
    </Wrapper>
  )
}

export default UserInput
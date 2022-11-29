import { useState } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  z-index: 1000;
  display: flex;
  width: 100vw;
  padding: 10px;
  height: 60px;

  @media screen and (max-width: 768px) {
    height: 40px;
  }
`

const Input = styled.input`
  border: 1px solid #fff;
  font-size: 35px;
  width: calc(100vw - 135px);
  border-radius: 5px;

  @media screen and (max-width: 768px) {
    font-size: 20px;
    width: calc(100vw - 140px);
  }
`

const Button = styled.button`
  border: 1px solid #fff;
  font-size: 23px;
  border-radius: 5px;
  margin-left: 10px;
  width: 100px;

  @media screen and (max-width: 768px) {
    font-size: 17px;
    width: 85px;
    padding: 0;
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
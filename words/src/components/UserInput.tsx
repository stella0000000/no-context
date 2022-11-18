import { useState } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  z-index: 1000;
  display: flex;
  width: 100vw;
  padding: 20px 20px;
  background: #fff;
  height: 60px;
`

const Input = styled.input`
  border: 2px solid black;
  font-size: 40px;
  width: calc(100vw - 155px);
`

const Button = styled.button`
  background: #FFD0EF;
  font-size: 20px;
  border-radius: 5px;
  margin-left: 10px;
  width: 100px;
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
        <Input onChange={e => setInputValue(e.target.value)} onKeyDown={e => handleKeyPress(e)}/>
        <Button onClick={() => setQuery(inputValue)}>search</Button>
    </Wrapper>
  )
}

export default UserInput
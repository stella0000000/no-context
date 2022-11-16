import styled from 'styled-components'

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  width: 100vw;
  padding: 20px 0px;
  background: #fff;
  height: 60px;
`

const Input = styled.input`
  border: 2px solid black;
  font-size: 40px;
  width: 80%;
`

const Button = styled.button`
  background: #FFD0EF;
  font-size: 20px;
  border-radius: 5px;
  margin-left: 10px;
`

const UserInput = () => {
  return (
    <Wrapper>
        <Input />
        <Button>enter</Button>
    </Wrapper>
  )
}

export default UserInput
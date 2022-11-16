import './App.css';
// import Reddit from './components/Reddit';
// import Google from './components/Google';
import Chatbox from './components/Chatbox';
import UserInput from './components/UserInput';

function App() {
  return (
    <div className="App">
      <Chatbox />
      <UserInput />
      {/* <Reddit />
      <Google /> */}
    </div>
  );
}

export default App;

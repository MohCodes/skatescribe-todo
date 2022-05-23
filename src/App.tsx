
import { RecoilRoot } from 'recoil';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Main from './Components/Main';
import io from 'socket.io-client';


export const socket = io('http://localhost:5000/');

function App() {
  return (
    <RecoilRoot>
      <div className="App d-flex flex-column " style={{height: "100vh"}}>
        <Main/>
      </div>
    </RecoilRoot>
  );
}

export default App;

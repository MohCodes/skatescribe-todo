
import { RecoilRoot } from 'recoil';
import './App.css';
import Header from './Components/Header';
import 'bootstrap/dist/css/bootstrap.min.css'
import Main from './Components/Main';
import Display from './Components/Display';

function App() {
  return (
    <RecoilRoot>
      <div className="App d-flex flex-column">
        {/* <Header/> */}
        <Main/>
      </div>
    </RecoilRoot>
  );
}

export default App;

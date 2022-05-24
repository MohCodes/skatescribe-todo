
import { RecoilRoot } from 'recoil';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Main from './Components/Main';


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

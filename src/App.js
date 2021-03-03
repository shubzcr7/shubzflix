import "./App.css";
import { Authprovider } from "./Authcontext";
import Nav from "./Nav";
function App() {
  return (
    <div className="App">
      <Authprovider />
    </div>
  );
}

export default App;

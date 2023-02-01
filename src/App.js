import './App.css';
import logo from "./logo.svg"
import Inputbar from "./components/Inputbar"



function App() {
  return (
    <>
      <div className="container d-flex flex-column justify-content-center align-items-center">
        <img className="logo img-fluid mb-3" src={logo} alt="logo" />
        <h4 className="text-light">Add items to your list</h4>
        <Inputbar></Inputbar>
      </div>
    </>
  );
}

export default App;

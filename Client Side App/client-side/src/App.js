import "./App.css";
import StartPage from "./Pages/StartPage";

//import toastify to show toast messages
import {ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {

  return (
    <div className="w-3/4 m-auto h-[500px] box-border block text-center mt-28 card relative rounded-lg shadow-2xl">
      <StartPage />
      <ToastContainer />
    </div>
  );
}

export default App;

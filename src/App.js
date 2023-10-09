import "./App.css";
import AppRouter from "./Routes/Router";
// import Header from "./Components/Header/Sidebar";

import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
      <div className="content">
        <AppRouter />
      </div>
    </>
  );
}

export default App;

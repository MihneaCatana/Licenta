import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login/Login";
import { Homepage } from "./pages/Homepage/Homepage";
import { Page404 } from "./pages/Page404/Page404";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index path="/login" element={<Login />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;

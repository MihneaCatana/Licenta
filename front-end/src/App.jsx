import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet, useParams,
} from "react-router-dom";
import Login from "./pages/Login/Login";
import Homepage from "./pages/Homepage/Homepage";
import Page404 from "./pages/Page404/Page404";
import Profile from "./pages/Profile/Profile";
import MyTasks from "./pages/MyTasks/MyTasks";
import SingleTask from "./pages/SingleTask/SingleTask";

function App() {
  const isAuthenticated = () => {
    const account = localStorage.getItem("myAccount");
    return !!account; // Convert to boolean
  };

  const PrivateRoute = ({ path }) => {
    const auth = isAuthenticated(); // determine if authorized, from context or however you're doing it

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return auth ? <Outlet /> : <Navigate to={path} />;
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/homepage" element={<PrivateRoute path="/login" />}>
          <Route path="/homepage" element={<Homepage />} />
        </Route>
        <Route path="/profile" element={<PrivateRoute path="/login" />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/mytasks" element={<PrivateRoute path="/login" />}>
          <Route path="/mytasks" element={<MyTasks />} />
        </Route>
        <Route path="/task/:taskId" element={<PrivateRoute path="/login" />}>
          <Route path="/task/:taskId" element={<SingleTask id={useParams()} />} />
        </Route>
        <Route path="*" element={<Page404 />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;

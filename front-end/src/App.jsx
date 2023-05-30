import "./App.css";
import {Navigate, Outlet, Route, Routes, useParams,} from "react-router-dom";
import Login from "./pages/Login/Login";
import Homepage from "./pages/Homepage/Homepage";
import Page404 from "./pages/Page404/Page404";
import Profile from "./pages/Profile/Profile";
import MyTasks from "./pages/MyTasks/MyTasks";
import SingleTask from "./pages/SingleTask/SingleTask";
import ManagementPanel from "./pages/ManagementPanel/ManagementPanel";
import Users from "./pages/Users/Users"
import Departments from "./pages/Departments/Departments"
import Projects from "./pages/Projects/Projects";
import Tasks from "./pages/Tasks/Tasks"

import {LocalizationProvider} from '@mui/x-date-pickers';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'

function App() {
    const isAuthenticated = () => {
        const account = localStorage.getItem("myAccount");
        return !!account; // Convert to boolean
    };

    const PrivateRoute = ({path}) => {
        const auth = isAuthenticated(); // determine if authorized

        // If authorized, return an outlet that will render child elements
        // If not, return element that will navigate to login page
        return auth ? <Outlet/> : <Navigate to={path}/>;
    };

    const theme = createTheme({
        "palette": {
            "common": {
                "black": "#000",
                "white": "#fff"
            },
            "background": {
                "paper": "#fff",
                "default": "#fafafa"
            },
            "primary": {
                "light": "rgba(255, 195, 89, 1)",
                "main": "rgba(245, 166, 35, 1)",
                "dark": "rgba(211, 134, 11, 1)",
                "contrastText": "#fff"
            },
            "secondary": {
                "light": "rgba(227, 119, 248, 1)",
                "main": "rgba(154, 34, 177, 1)",
                "dark": "rgba(102, 13, 179, 1)",
                "contrastText": "#fff"
            },
            "error": {
                "light": "#e57373",
                "main": "rgba(248, 28, 12, 1)",
                "dark": "#d32f2f",
                "contrastText": "#fff"
            },
            "text": {
                "primary": "rgba(0, 0, 0, 0.87)",
                "secondary": "rgba(0, 0, 0, 0.54)",
                "disabled": "rgba(0, 0, 0, 0.38)",
                "hint": "rgba(0, 0, 0, 0.38)"
            }
        }
    });

    return (

        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className="App">
                    <Routes>
                        <Route path="/login" element={<Login/>}/>

                        <Route path="/homepage" element={<PrivateRoute path="/login"/>}>
                            <Route path="/homepage" element={<Homepage/>}/>
                        </Route>
                        <Route path="/profile" element={<PrivateRoute path="/login"/>}>
                            <Route path="/profile" element={<Profile/>}/>
                        </Route>
                        <Route path="/mytasks" element={<PrivateRoute path="/login"/>}>
                            <Route path="/mytasks" element={<MyTasks/>}/>
                        </Route>
                        <Route path="/task/:taskId" element={<PrivateRoute path="/login"/>}>
                            <Route path="/task/:taskId" element={<SingleTask id={useParams()}/>}/>
                        </Route>
                        <Route path="/management" element={<PrivateRoute path="/login"/>}>
                            <Route path="/management" element={<ManagementPanel/>}/>
                        </Route>
                        <Route path="/users" element={<PrivateRoute path="/login"/>}>
                            <Route path="/users" element={<Users/>}/>
                        </Route>
                        <Route path="/departments" element={<PrivateRoute path="/login"/>}>
                            <Route path="/departments" element={<Departments/>}/>
                        </Route>
                        <Route path="/projects" element={<PrivateRoute path="/login"/>}>
                            <Route path="/projects" element={<Projects/>}/>
                        </Route>
                        <Route path="/tasks" element={<PrivateRoute path="/login"/>}>
                            <Route path="/tasks" element={<Tasks/>}/>
                        </Route>

                        <Route path="*" element={<Page404/>}/>
                        <Route path="/" element={<Navigate to="/login"/>}/>
                    </Routes>
                </div>
            </LocalizationProvider>
        </ThemeProvider>
    );
}

export default App;

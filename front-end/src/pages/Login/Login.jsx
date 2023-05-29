//HOOKS
import {useState} from "react";

// ROUTING
import {useNavigate} from "react-router-dom";

// MATERIAL UI
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

// TOAST
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//AXIOS
import Axios from "axios";

// CSS
import "./Login.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const validations = () => {
        if (email.toString().trim() === "") {
            toast.error("Email must be completed!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
            });
        } else if (password.includes(" ")) {
            toast.error("Password must not have spaces!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
            });
        } else if (password.length < 6) {
            toast.error("Password must have at least 6 characters!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
            });
        } else if (/^[a-zA-Z0-9_.+-]+@gmail\.com$/.test(email) === false) {
            toast.error("The email must be example@gmail.com", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
            });
        } else {
            Axios.post("http://localhost:8085/user/login", {
                email: email,
                password: password,
            })
                .then((response) => {
                    localStorage.setItem("myAccount", JSON.stringify(response));
                    navigate("/homepage");
                })
                .catch(() => {
                    toast.error("Invalid credentials!", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                        theme: "light",
                    });
                });
        }
    };

    return (
        <div className="login_layout">
            <div className="login_card">
                <div className="login_title">wePlan</div>
                <TextField
                    id="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    label="Email"
                    variant="outlined"
                />
                <TextField
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                />
                <Button variant="contained" color="primary" onClick={validations}>
                    Login
                </Button>
            </div>
            <ToastContainer/>
        </div>
    );
}

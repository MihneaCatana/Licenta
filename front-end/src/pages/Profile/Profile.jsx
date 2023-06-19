//HOOKS
import {useEffect, useState, useRef, useContext} from "react"

// USER MADE COMPONENTS
import Appbar from "../../components/Appbar/Appbar"

// MATERIAL UI
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness4';
import IconButton from '@mui/material/IconButton';

// AXIOS
import Axios from "axios";

// TOAST
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//CSS
import "./Profile.css"
import Button from "@mui/material/Button";
import {ContextTheme} from "../../App";


export default function Profile() {

    const [department, setDepartment] = useState("");
    const [statusUser, setStatusUser] = useState("");
    const [email, setEmail] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [validPath, setValidPath] = useState(false);
    const [activeImage, setActiveImage] = useState(false)

    const [themeDetails, setThemeDetails] = useContext(ContextTheme);
    const [darkMode, setDarkMode] = useState(false)

    let ProfilePicComponent = useRef(null);


    useEffect(() => {

        const account = JSON.parse(localStorage.getItem("myAccount"))

        if (localStorage.getItem("darkMode"))
            setDarkMode(localStorage.getItem("darkMode"))

        setEmail(account.data.email);
        checkFilePath(`../../assets/${account.data.email.split("@")[0]}.jpg`)


        Axios.get("http://localhost:8085/department/" + account.data.idDepartment).then((response) => {
            setDepartment(response.data.name)
        })
        Axios.get("http://localhost:8085/statusUser/" + account.data.idStatus).then((response) => {
            setStatusUser(response.data.name)
        })


    }, [])

    useEffect(() => {
        const account = JSON.parse(localStorage.getItem("myAccount"))

        async function setPhoto() {
            if (validPath) {

                await import(`../../assets/${account.data.email.split("@")[0]}.jpg`).then(
                    (module) => {
                        ProfilePicComponent.current = module.default;
                        setActiveImage(true);
                    }
                ).catch((err) => {
                    console.log(err)
                });

            } else {
                import("../../assets/employee.png").then((module) => {
                    ProfilePicComponent.current = module.default;
                });
            }
        }

        setPhoto();
    }, [validPath]);


    function checkFilePath(url) {
        var request = new XMLHttpRequest();
        request.open("GET", url, false);
        request.send();

        if (request.status === 200) {
            setValidPath(true);
        } else {
            setValidPath(false);
        }

    }


    const insertImage = async () => {

        if (selectedImage) {
            const formData = new FormData();

            formData.append('image', selectedImage, email.split('@')[0] + ".jpg");

            await Axios.post("http://localhost:8085/other/uploadImage",
                formData
                , {
                    headers: {'Content-Type': 'multipart/form-data'}
                })
            console.log(selectedImage)
            window.location.reload(false);

        } else {
            toast.error("Must upload image!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
            });
        }
    }

    const setBlueTheme = () => {
        const palette = {
            "palette": {
                "primary": {
                    "main": "#2771ee",
                    "contrastText": "#fff"
                },
            }
        }

        setThemeDetails(palette)
        localStorage.setItem("theme", JSON.stringify(palette))
        localStorage.setItem("darkMode", false)
    }

    const setOrangeTheme = () => {
        const palette = {
            "palette": {
                "primary": {
                    "main": "rgba(245, 166, 35, 1)",
                    "contrastText": "#fff"
                },
            }
        }
        setThemeDetails(palette)
        localStorage.setItem("theme", JSON.stringify(palette))
        localStorage.setItem("darkMode", false)
    }

    const setGreenTheme = () => {
        const palette = {
            "palette": {
                "primary": {
                    "main": "#009142",
                    "contrastText": "#fff"
                },
            }
        }

        setThemeDetails(palette)
        localStorage.setItem("theme", JSON.stringify(palette))
        localStorage.setItem("darkMode", false)
    }

    const setPurpleTheme = () => {
        const palette = {
            "palette": {
                "primary": {
                    "main": "rgba(102, 13, 179, 1)",
                    "contrastText": "#fff"
                },
            }
        }

        setThemeDetails(palette)
        localStorage.setItem("theme", JSON.stringify(palette))
        localStorage.setItem("darkMode", false)
        setDarkMode(false)
    }

    const setDarkBlueTheme = () => {
        const palette = {
            "palette": {
                "primary": {
                    "main": "rgba(38,102,215,0.90)",
                    "contrastText": "#fff"
                },
                "mode": "dark"
            }
        }

        setThemeDetails(palette)
        localStorage.setItem("theme", JSON.stringify(palette))
        localStorage.setItem("darkMode", true)
        setDarkMode(true)

    }

    return (
        <>
            <Appbar/>

            <div className="profile_layout">
                <div className="panel_title">
                    Profile
                </div>
                <div className="profile_card">
                    <div className="profile_card_details">

                        <div className="circle_profile_photo">
                            {activeImage ?

                                <img
                                    src={ProfilePicComponent.current}
                                    style={{
                                        height: 170,
                                        width: 170,
                                        marginTop: 20,
                                        borderRadius: 100,
                                        objectFit: "contain",
                                        border: "1px solid black"
                                    }}
                                    alt="ProfilePicture"

                                /> : <img
                                    src={require("../../assets/employee.png")}
                                    style={{height: 174, marginTop: 20, borderRadius: 95}}
                                    alt="ProfilePicture"
                                />

                            }
                        </div>

                        <div className="account_details">
                            <p><b>Email:</b> {email}</p>
                            <p><b>Department:</b> {department}</p>
                            <p><b>Status:</b> {statusUser}</p>
                        </div>
                    </div>
                    <div className="color_mode">
                        <p> Light Mode Themes </p>
                        <div className="light_mode_themes">
                            <div className="orange_light_theme" onClick={setOrangeTheme}/>
                            <div className="blue_light_theme" onClick={setBlueTheme}/>
                            <div className="green_light_theme" onClick={setGreenTheme}/>
                            <div className="purple_light_theme" onClick={setPurpleTheme}/>
                        </div>
                        <p className="title_dark_mode"> Dark Mode</p>
                        <div className="dark_mode">


                            {darkMode ?

                                <IconButton sx={{backgroundColor: "wheat"}} onClick={setDarkBlueTheme}>
                                    <Brightness4Icon/>
                                </IconButton> :

                                <IconButton sx={{backgroundColor: "red"}} onClick={setDarkBlueTheme}>
                                    <Brightness7Icon/>
                                </IconButton>}

                        </div>
                    </div>
                    <div className="image_changer_container">
                        <input type="file" accept=".png, .jpg, .jpeg" name='image' id='image' onChange={(e) => {
                            setSelectedImage(e.target.files[0]);
                            console.log(e.target.files[0])
                        }}/>
                        <Button variant="contained" sx={{marginBottom: 2}} onClick={insertImage}>Change image</Button>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </>
    );
}

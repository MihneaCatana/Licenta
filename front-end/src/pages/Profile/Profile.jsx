//HOOKS
import {useEffect, useState} from "react"

// USER MADE COMPONENTS
import Appbar from "../../components/Appbar/Appbar"

// AXIOS
import Axios from "axios";

// TOAST
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//CSS
import "./Profile.css"
import Button from "@mui/material/Button";


export default function Profile() {

    const [department, setDepartment] = useState("");
    const [statusUser, setStatusUser] = useState("");
    const [email, setEmail] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {

        const account = JSON.parse(localStorage.getItem("myAccount"))
        setEmail(account.data.email);

        Axios.get("http://localhost:8085/department/" + account.data.idDepartment).then((response) => {
            setDepartment(response.data.name)
        })
        Axios.get("http://localhost:8085/statusUser/" + account.data.idStatus).then((response) => {
            setStatusUser(response.data.name)
        })

    }, [])

    const insertImage = async () => {

        if (selectedImage) {
            const formData = new FormData();

            formData.append('image', selectedImage);
            formData.append('fileName', email.split('@')[0])

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


    return (
        <>
            <Appbar/>

            <div className="profile_layout">
                <div className="panel_title">
                    Profile
                </div>
                <div className="profile_card">
                    <div className="profile_card_details">
                        <img src={require(`../../assets/employee.png`)} style={{height: 74, marginTop: 20}}
                             alt="ProfilePicture"/>
                        <div className="account_details">
                            <p><b>Email:</b> {email}</p>
                            <p><b>Department:</b> {department}</p>
                            <p><b>Status:</b> {statusUser}</p>
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

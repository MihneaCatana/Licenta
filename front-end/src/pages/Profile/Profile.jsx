//HOOKS
import {useEffect, useState} from "react"

//IMAGES
import employee from "../../assets/employee.png"

// USER MADE COMPONENTS
import Appbar from "../../components/Appbar/Appbar"

//MATERIAL UI
import {Avatar} from "@mui/material";

// AXIOS
import Axios from "axios";

//CSS
import "./Profile.css"


export default function Profile() {
    const account = JSON.parse(localStorage.getItem("myAccount"))

    const [department, setDepartment] = useState("");
    const [statusUser, setStatusUser] = useState("");

    useEffect(() => {
        Axios.get("http://localhost:8085/department/" + account.data.idDepartment).then((response) => {
            setDepartment(response.data.name)
        })
        Axios.get("http://localhost:8085/statusUser/" + account.data.idStatus).then((response) => {
            setStatusUser(response.data.name)
        })

    }, [])


    return (
        <>
            <Appbar/>

            <div className="profile_layout">
                <div className="management_panel_title">
                    Profile
                </div>
                <div className="profile_card">
                    <Avatar alt="Travis Howard" src={employee} sx={{width: 74, height: 74, marginTop: 1}}/>
                    <div className="account_details">
                        <p><b>Email:</b> {account.data.email}</p>
                        <p><b>Department:</b> {department}</p>
                        <p><b>Status:</b> {statusUser}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

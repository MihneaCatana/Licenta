import Appbar from "../components/Appbar/Appbar";
import {useEffect, useState} from "react";
import Axios from "axios";
import {useParams} from "react-router-dom";
import useLocalPhoto from "../hooks/useLocalPhoto";

export function UserProfile() {

    const {email} = useParams();

    const [user, setUser] = useState(null)
    const [department, setDepartment] = useState("");
    const [statusUser, setStatusUser] = useState("");

    const profilePic = useLocalPhoto(email.split("@")[0])

    useEffect(() => {

        Axios.get("http://localhost:8085/user/email/" + email).then((response) => {
            setUser(response.data)
        })

    }, [email])

    useEffect(() => {

        if (user) {
            Axios.get("http://localhost:8085/department/" + user.idDepartment).then((response) => {
                setDepartment(response.data.name)
            })
            Axios.get("http://localhost:8085/statusUser/" + user.idStatus).then((response) => {
                setStatusUser(response.data.name)
            })
        }

    }, [user]);


    return (
        <>
            <Appbar/>
            <div className="profile_layout">
                <div className="panel_title">
                    {email}'s profile
                </div>
                <div className="profile_card">
                    <div className="profile_card_details">
                        <img src={profilePic} alt="profilePicture" className="profile_photo"/>
                        <div className="account_details">
                            <p><b>Email:</b> {email}</p>
                            <p><b>Department:</b> {department}</p>
                            <p><b>Status:</b> {statusUser}</p>
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}
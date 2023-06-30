import "./Comment.css"
import Axios from "axios"
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import useLocalPhoto from "../../hooks/useLocalPhoto";

export default function Comment({idUser, content}) {

    const [email, setEmail] = useState("")

    const profilePic = useLocalPhoto(email.split("@")[0])

    const navigate = useNavigate();

    useEffect(() => {
        Axios.get("http://localhost:8085/user/" + idUser).then((response) => {
            setEmail(response.data.email);
        })
    }, [idUser]);


    return (
        <div className="comment_container" onDoubleClick={() => {
            navigate("/users/" + email)
        }}>

            <p className="comment_content">
                <img src={profilePic} alt="profilePicture" className="image_comment"/> {email}
            </p> <br/>
            <p>{content}</p>


        </div>
    )
}
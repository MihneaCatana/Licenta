
import "./Comment.css"
import Axios from "axios"
import {useEffect, useState} from "react";
export default function Comment({idUser, content}) {

	const [email, setEmail] = useState("")

	useEffect(() => {
		Axios.get("http://localhost:8085/user/"+idUser).then((response)=>{
				setEmail(response.data.email);
		})
	}, []);


	return (
		<div className="comment_container">
			<p><b>By:</b> {email}</p> <br/>
			<p>{content}</p>

		</div>
	)
}
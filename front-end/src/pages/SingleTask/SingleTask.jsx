import Appbar from "../../components/Appbar/Appbar";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import "./Singletask.css"
import Axios from "axios"

export default function SingleTask() {

	const { taskId } = useParams();

	const [task,setTask] = useState(null);
	const [project, setProject] = useState(null);
	const [statusTask,setStatusTask] = useState(null);
	const [date,setDate] =useState(new Date());

	useEffect(()=>{

		Axios.get("http://localhost:8085/task/"+taskId).then((response)=>{
			setTask(response.data);
			setDate(new Date (response.data.deadline))

			if(new Date(response.data.deadline).getTime() < new Date()) {
				document.getElementsByClassName("task_status_color")[0].style.background="red"
			} else if(new Date(response.data.deadline).getTime() > new Date()){
				document.getElementsByClassName("task_status_color")[0].style.background="yellow"
			}
			const idProject = response.data.idProject;
			if(idProject) {
				Axios.get("http://localhost:8085/task/" + idProject)
					.then((response) => {
						setProject(response.data);
					})
			}
			const idStatusTask = response.data.idStatusTask;
			Axios.get("http://localhost:8085/statusTask/"+idStatusTask).then((response)=>{
				setStatusTask(response.data)
			})
		})


	},[taskId])



	return (

		<>
			<Appbar/>
			<p className="task_title"> Task #{taskId}</p>
			<div className="task_card_container">
			<div className="task_card">
				{ task ?
					<>
					<p className="task_title"> {task.name}</p>
					<div className="task_details">
						<p> <b>Description: <br/></b> {task.description} </p>
						<p> <b>Deadline:</b>  { (date.toLocaleDateString("en-US") + " " + date.toLocaleTimeString() ) } </p>

						{project ? <p> <b>Project:</b> {project.name}</p> : <p><b>Project: </b>None</p>}
						{statusTask ? <p> <b>Status: </b> {statusTask.name} </p> :<p> <b>Status: </b> None </p>}

					</div>
						<Button variant="contained">Finish</Button>
					</>
					: <></>}

				<div className="task_status_color"></div>
			</div>
				<div className="task_comment_zone">
					<div className="task_comments">
						comment
					</div>
					<div className="task_addComment">
						<TextField id="outlined-basic" label="Type your Comment" variant="standard" multiline sx={{width:'85%'}} />
						<SendIcon className="task_sendComment"  sx={{width:'15%', color:"#1976d2"}}/>
					</div>
				</div>
			</div>
		</>
	)
}
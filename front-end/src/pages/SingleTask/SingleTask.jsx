//HOOKS
import {useEffect, useState} from "react";

// ROUTING
import {useNavigate, useParams} from "react-router-dom";

// USER MADE COMPONENTS
import Appbar from "../../components/Appbar/Appbar";
import Comment from "../../components/Comment/Comment"

//MATERIAL UI
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';

// TOAST
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//AXIOS
import Axios from "axios"

// CSS
import "./Singletask.css"


export default function SingleTask(callbackfn, thisArg) {

    const {taskId} = useParams();

    const account = JSON.parse(localStorage.getItem("myAccount"))

    const [open, setOpen] = useState(false);
    const [task, setTask] = useState(null);
    const [project, setProject] = useState(null);
    const [statusTask, setStatusTask] = useState(null);
    const [commentUser, setCommentUser] = useState("");
    const [comments, setComments] = useState([]);
    const [date, setDate] = useState(new Date());

    const navigate = useNavigate();

    useEffect(() => {

        Axios.get("http://localhost:8085/task/" + taskId).then((response) => {
            setTask(response.data);
            setDate(new Date(response.data.deadline))

            if (response.data.finishedTime) {
                document.getElementsByClassName("task_status_color")[0].style.background = "green"
            } else {
                if (new Date(response.data.deadline).getTime() < new Date()) {
                    document.getElementsByClassName("task_status_color")[0].style.background = "red"
                } else if (new Date(response.data.deadline).getTime() > new Date()) {
                    document.getElementsByClassName("task_status_color")[0].style.background = "yellow"
                }
            }

            const idProject = response.data.idProject;
            if (idProject) {
                Axios.get("http://localhost:8085/project/" + idProject)
                    .then((response) => {
                        setProject(response.data);
                    })
            }
            const idStatusTask = response.data.idStatusTask;
            Axios.get("http://localhost:8085/statusTask/" + idStatusTask).then((response) => {
                setStatusTask(response.data)
            })
        })

        Axios.get("http://localhost:8085/comment/task/" + taskId).then((response) => {
            setComments(response.data)


        })

    }, [taskId])

    const sendComment = () => {

        if (commentUser.length > 0) {
            Axios.post("http://localhost:8085/comment/create", {
                idTask: taskId,
                idUser: account.data.id,
                content: commentUser
            })
            window.location.reload(false);

        } else {
            toast.error("Comment must not be null!", {
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

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const confirmFinishingTask = () => {
        Axios.put("http://localhost:8085/task/" + taskId, {
            finishedTime: new Date(),
            idStatusTask: 4
        })
        setOpen(false);
        window.location.reload(false);
    }

    return (

        <>
            <ToastContainer/>
            <Appbar/>
            <p className="task_title"> Task #{taskId}</p>
            <div className="task_card_container">
                <div className="task_card">
                    {task ?
                        <>
                            <p className="task_title"> {task.name}</p>
                            <div className="task_details">
                                <p><b>Description: <br/></b> {task.description} </p>
                                <p>
                                    <b>Deadline:</b> {(date.toLocaleDateString("en-US") + " " + date.toLocaleTimeString())}
                                </p>

                                {project ? <p><b>Project:</b> {project.name}</p> : <p><b>Project: </b>None</p>}
                                {statusTask ? <p><b>Status: </b> {statusTask.name} </p> : <p><b>Status: </b> None </p>}

                            </div>
                            <Button variant="contained" onClick={handleClickOpen}>Finish</Button>
                            <Dialog
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">
                                    {"Do you confirm finishing the task? "}
                                </DialogTitle>
                                <DialogActions>
                                    <Button onClick={handleClose}>Decline</Button>
                                    <Button onClick={confirmFinishingTask} autoFocus>Confirm</Button>
                                </DialogActions>
                            </Dialog>
                        </>
                        : <></>}

                    <div className="task_status_color"></div>
                </div>
                <div className="task_comment_zone">
                    <div className="task_comments">
                        {comments.length > 0 ? <>
                            {comments.map((comment, key) => {
                                return <Comment key={key} idUser={comment.idUser} content={comment.content}/>
                            })

                            }
                        </> : <> No Comments!</>}
                    </div>
                    <div className="task_addComment">
                        <TextField id="outlined-basic" label="Type your Comment" variant="standard" multiline
                                   sx={{width: '85%'}}
                                   onChange={(e) => {
                                       setCommentUser(e.target.value)
                                   }}
                        />
                        <SendIcon className="task_sendComment" sx={{width: '15%', color: "#1976d2"}}
                                  onClick={sendComment}/>
                    </div>
                </div>
            </div>
            <div className="task_returnButton">
                <Button variant="contained" onClick={() => {
                    navigate("/mytasks")
                }}>Back to Tasks</Button>
            </div>
        </>
    )
}
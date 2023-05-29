// HOOKS
import {useEffect, useState} from "react";

// USER MADE COMPONENTS
import Appbar from "../../components/Appbar/Appbar";

// TOAST
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer} from "react-toastify";

// MATERIAL UI
import {DataGrid} from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {Autocomplete} from "@mui/material";
import {StaticDateTimePicker} from '@mui/x-date-pickers/StaticDateTimePicker';

//DAYJS
import dayjs from 'dayjs';

// AXIOS
import Axios from "axios";


export default function Tasks() {

    const [tasks, setTasks] = useState([]);
    const [columns, setColumns] = useState([])
    const [editMode, setEditMode] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState(0);
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [deadline, setDeadline] = useState(dayjs(''));

    const [statusTasks, setStatusTasks] = useState([])
    const [projects, setProjects] = useState([])
    const [users, setUsers] = useState([])

    const [selectedStatusTask, setSelectedStatusTask] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null)

    const [idProject, setIdProject] = useState(0)
    const [idStatusTask, setIdStatusTask] = useState(0)
    const [idUser, setIdUser] = useState(0)

    useEffect(() => {
        Axios.get("http://localhost:8085/task").then((response) => {
            setTasks(response.data)
            setColumns(Object.keys(response.data[0]))
        })

        Axios.get("http://localhost:8085/statusTask").then((response) => {
            setStatusTasks(Array.from(response.data))
        })

        Axios.get("http://localhost:8085/project").then((response) => {
            setProjects(Array.from(response.data))
        })

        Axios.get("http://localhost:8085/user").then((response) => {
            setUsers(Array.from(response.data))
        })

    }, [])


    const handleCloseConfirmation = () => {
        setOpenConfirmation(false)
    }

    const openAddModal = () => {
        setEditMode(false);
        setOpen(true);

        //reset to default values
        setName("")
    }
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 550,
        height: 740,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 24,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        p: 4,
    };

    const editButtonCell = (params) => {
        return (
            <Button
                onClick={() => {
                    setSelectedTaskId(params.row.id)
                    setEditMode(true);
                    setName(params.row.name)
                    setDescription(params.row.description)

                    setOpen(true);
                }}
                sx={{marginLeft: 1, backgroundColor: 'transparent', color: 'black', padding: '6px'}}
                startIcon={<ModeEditIcon/>}> </Button>
        )
    }

    const deleteButtonCell = (params) => {
        return (
            <Button variant="containted" startIcon={<DeleteIcon/>} onClick={() => {
                setSelectedTaskId(params.row.id);
                setOpenConfirmation(true);
            }} sx={{color: 'red'}}></Button>
        )
    }

    const columnsWithButton = [
        ...columns.map((column) => ({field: column, width: 160})),
        {field: "  ", renderCell: editButtonCell},
        {field: "   ", renderCell: deleteButtonCell}
    ];

    const [open, setOpen] = useState(false);
    const [openConfirmation, setOpenConfirmation] = useState(false);

    const addTask = () => {

    }

    const editTask = async () => {

    }

    const deleteTask = () => {
        Axios.delete("http://localhost:8085/task" + selectedTaskId);
        window.location.reload(false);
    }

    return (
        <>
            <ToastContainer/>
            <Appbar/>
            <div className="management_panel_title">
                Tasks
            </div>
            <div className="mytasks_container_dataGrid">
                <div className="mytasks_dataGrid">
                    {columns.length > 0 ?

                        <DataGrid columns={columnsWithButton} rows={tasks}
                        />
                        : <></>}

                </div>
            </div>
            <div className="users_buttons">
                <Button variant="contained" onClick={openAddModal}>Add Task</Button>
            </div>

            {/*Confirmation dialog for Delete*/}
            <Dialog
                open={openConfirmation}
                onClose={handleCloseConfirmation}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Do you confirm deleting this task? "}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleCloseConfirmation}>Decline</Button>
                    <Button onClick={deleteTask} autoFocus>Confirm</Button>
                </DialogActions>
            </Dialog>

            {/*Modal for Add / Edit*/}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {editMode ? <h3>Edit Task</h3> : <h3>Add Task</h3>}

                    <TextField
                        id="name"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                        label="Name"
                        variant="outlined"
                    />
                    <TextField
                        id="description"
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                        label="Description"
                        variant="outlined"
                    />

                    {projects.length > 0 ?
                        <Autocomplete
                            disablePortal
                            id="combo-box-projects"
                            options={projects}
                            getOptionLabel={(option) => option.name || ""}
                            sx={{width: 300}}
                            value={selectedProject}
                            onChange={(event, value) => {
                                setIdProject(value.id)
                                setSelectedProject(value)
                            }}
                            renderInput={(params) => <TextField {...params} label="Projects"/>}
                        />
                        : <></>}

                    {statusTasks.length > 0 ?
                        <Autocomplete
                            disablePortal
                            id="combo-box-statusTasks"
                            options={statusTasks}
                            getOptionLabel={(option) => option.name || ""}
                            sx={{width: 300}}
                            value={selectedStatusTask}
                            onChange={(event, value) => {
                                setIdStatusTask(value.id)
                                setSelectedStatusTask(value)
                            }}
                            renderInput={(params) => <TextField {...params} label="Status Task"/>}
                        />
                        : <></>}

                    {users.length > 0 ?
                        <Autocomplete
                            disablePortal
                            id="combo-box-users"
                            options={users}
                            getOptionLabel={(option) => option.email || ""}
                            sx={{width: 300}}
                            value={selectedUser}
                            onChange={(event, value) => {
                                setIdUser(value.id)
                                setSelectedUser(value)
                            }}
                            renderInput={(params) => <TextField {...params} label="User"/>}
                        />
                        : <></>}

                    <StaticDateTimePicker defaultValue={dayjs('2023-07-17T15:30')} orientation="landscape" disablePast
                                          ampm={false}
                                          value={deadline} onChange={(value) => {
                        console.log(value)
                        console.log(new Date(value))
                        setDeadline(value)

                    }}
                    />

                    {editMode ? <Button variant="contained" onClick={editTask}>Edit </Button> :
                        <Button variant="contained" onClick={addTask}>Add </Button>}
                </Box>

            </Modal>
        </>
    )
}
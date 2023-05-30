// HOOKS
import {useEffect, useState} from "react";

// USER MADE COMPONENTS
import Appbar from "../../components/Appbar/Appbar";
import Button from "@mui/material/Button";

// TOAST
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// MATERIAL UI
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import {DataGrid} from "@mui/x-data-grid";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

// AXIOS
import Axios from "axios";

export default function Projects() {

    const [projects, setProjects] = useState([]);
    const [columns, setColumns] = useState([])
    const [editMode, setEditMode] = useState(false);
    const [selectedDepartmentId, setSelectedProjectId] = useState(0);
    const [name, setName] = useState("")

    useEffect(() => {
        Axios.get("http://localhost:8085/project").then((response) => {
            setProjects(response.data)
            setColumns(Object.keys(response.data[0]))
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
        width: 400,
        height: 400,
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
                    setSelectedProjectId(params.row.id)
                    setEditMode(true);
                    setName(params.row.name)

                    setOpen(true);
                }}
                sx={{marginLeft: 1, backgroundColor: 'transparent', color: 'black', padding: '6px'}}
                startIcon={<ModeEditIcon/>}> </Button>
        )
    }

    const deleteButtonCell = (params) => {
        return (
            <Button variant="containted" startIcon={<DeleteIcon/>} onClick={() => {
                setSelectedProjectId(params.row.id);
                setOpenConfirmation(true);
            }} sx={{color: 'red'}}></Button>
        )
    }

    const columnsWithButton = [
        ...columns.map((column) => ({field: column, width: 180})),
        {field: "  ", renderCell: editButtonCell},
        {field: "   ", renderCell: deleteButtonCell}
    ];

    const [open, setOpen] = useState(false);
    const [openConfirmation, setOpenConfirmation] = useState(false);

    const addProject = async () => {
        const foundDepartment = await Axios.get("http://localhost:8085/project/name/" + name);
        if (foundDepartment.data) {
            toast.error("This department already exists!", {
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
            Axios.post("http://localhost:8085/project/create", {
                name: name
            });
            window.location.reload(false);
        }

    }

    const editProject = async () => {

        const foundDepartment = await Axios.get("http://localhost:8085/project/name/" + name);

        if (foundDepartment.data) {
            toast.error("This department already exists!", {
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
            Axios.put("http://localhost:8085/project/" + selectedDepartmentId, {
                name: name
            });
            window.location.reload(false);
        }
    }

    const deleteProject = () => {
        Axios.delete("http://localhost:8085/project/" + selectedDepartmentId);
        window.location.reload(false);
    }

    return (
        <>
            <ToastContainer/>
            <Appbar/>
            <div className="panel_title">
                Projects
            </div>
            <div className="mytasks_container_dataGrid">
                <div className="mytasks_dataGrid">
                    {columns.length > 0 ?

                        <DataGrid columns={columnsWithButton} rows={projects}
                        />
                        : <></>}

                </div>
            </div>
            <div className="users_buttons">
                <Button variant="contained" onClick={openAddModal}>Add Project</Button>
            </div>

            {/*Confirmation dialog for Delete*/}
            <Dialog
                open={openConfirmation}
                onClose={handleCloseConfirmation}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Do you confirm deleting this project? "}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleCloseConfirmation}>Decline</Button>
                    <Button onClick={deleteProject} autoFocus>Confirm</Button>
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
                    {editMode ? <h3>Edit Project</h3> : <h3>Add Project</h3>}

                    <TextField
                        id="email"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                        label="Name"
                        variant="outlined"
                    />

                    {editMode ? <Button variant="contained" onClick={editProject}>Edit </Button> :
                        <Button variant="contained" onClick={addProject}>Add </Button>}
                </Box>

            </Modal>
        </>
    )
}
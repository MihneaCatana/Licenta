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
import PieChart from "../../components/PieChart/PieChart";

export default function Departments() {

    const [departments, setDepartments] = useState([]);
    const [columns, setColumns] = useState([])
    const [tasks, setTasks] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [selectedDepartmentId, setSelectedDepartmentId] = useState(0);
    const [name, setName] = useState("")
    const [selectedRow, setSelectedRow] = useState();

    useEffect(() => {
        Axios.get("http://localhost:8085/department").then((response) => {
            setDepartments(response.data)
            setColumns(Object.keys(response.data[0]))
        })

    }, [])

    const finishedTasks = tasks.filter((element) => element.finishedTime)
    const unfinishedTasks = tasks.filter((element) => !element.finishedTime)

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
                    setSelectedDepartmentId(params.row.id)
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
                setSelectedDepartmentId(params.row.id);
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

    const addDepartment = async () => {
        const foundDepartment = await Axios.get("http://localhost:8085/department/name/" + name);
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
            Axios.post("http://localhost:8085/department/create", {
                name: name
            });
            window.location.reload(false);
        }

    }

    const editDepartment = async () => {

        const foundDepartment = await Axios.get("http://localhost:8085/department/name/" + name);

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
            Axios.put("http://localhost:8085/department/" + selectedDepartmentId, {
                name: name
            });
            window.location.reload(false);
        }
    }

    const deleteDepartment = () => {
        Axios.delete("http://localhost:8085/department/" + selectedDepartmentId);
        window.location.reload(false);
    }

    return (
        <>
            <ToastContainer/>
            <Appbar/>
            <div className="panel_title">
                Departments
            </div>
            <div className="mytasks_container_dataGrid">
                <div className="mytasks_dataGrid">
                    {columns.length > 0 ?

                        <DataGrid columns={columnsWithButton} rows={departments} onRowClick={(row) => {
                            setSelectedRow(row.id);
                            Axios.get("http://localhost:8085/task/department/" + row.id).then((response) => {
                                setTasks(response.data)
                            })
                        }}
                        />
                        : <></>}


                </div>
            </div>
            <div className="users_buttons">
                <Button variant="contained" onClick={openAddModal}>Add Department</Button>
            </div>

            {selectedRow > 0 ?
                <div>
                    <div className="taskstats">
                        <div className="card_homepage">
                            <div className="panel_title">
                                Status of the tasks
                            </div>
                            {unfinishedTasks.length > 0 || finishedTasks.length > 0 ?
                                <PieChart data1={finishedTasks} data2={unfinishedTasks}/> : <>This department has
                                    currently no tasks / members</>}
                        </div>
                    </div>
                </div> : <> !</>}

            {/*Confirmation dialog for Delete*/}
            <Dialog
                open={openConfirmation}
                onClose={handleCloseConfirmation}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Do you confirm deleting this department? "}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleCloseConfirmation}>Decline</Button>
                    <Button onClick={deleteDepartment} autoFocus>Confirm</Button>
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
                    {editMode ? <h3>Edit Department</h3> : <h3>Add Department</h3>}

                    <TextField
                        id="email"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                        label="Name"
                        variant="outlined"
                    />

                    {editMode ? <Button variant="contained" onClick={editDepartment}>Edit </Button> :
                        <Button variant="contained" onClick={addDepartment}>Add </Button>}
                </Box>

            </Modal>
        </>
    )
}
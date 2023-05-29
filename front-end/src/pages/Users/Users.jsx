//HOOKS
import {useEffect, useState} from "react";

// USER MADE COMPONENTS
import Appbar from "../../components/Appbar/Appbar";

//MATERIAL UI
import Button from '@mui/material/Button';
import {DataGrid} from '@mui/x-data-grid';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import {Autocomplete} from "@mui/material";
import TextField from "@mui/material/TextField";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";

// TOAST
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//AXIOS
import Axios from "axios"

// CSS
import "./Users.css"


export default function Users() {

    const [users, setUsers] = useState([])
    const [columns, setColumns] = useState([])
    const [departments, setDepartments] = useState([])
    const [statusUsers, setStatusUsers] = useState([])
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [idDepartment, setIdDepartment] = useState(0)
    const [idStatusUser, setIdStatusUser] = useState(0)
    const [editMode, setEditMode] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [selectedStatusUser, setSelectedStatusUser] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(0);

    useEffect(() => {

        Axios.get("http://localhost:8085/user").then((response) => {
            setUsers(response.data)
            setColumns(Object.keys(response.data[0]))
        })

        Axios.get("http://localhost:8085/department").then((response) => {
            setDepartments(Array.from(response.data))

        })

        Axios.get("http://localhost:8085/statusUser").then((response) => {
            setStatusUsers(Array.from(response.data))
        })

    }, [])


    const activateStatusButtonCell = (params) => {
        return (
            <Button variant="contained" onClick={() => {
                Axios.get("http://localhost:8085/user/" + params.row.id).then((response) => {
                    if (response.data.activeAccount) {
                        Axios.put("http://localhost:8085/user/deactivate/" + params.row.id)
                    } else {
                        Axios.put("http://localhost:8085/user/activate/" + params.row.id)
                    }
                })
                window.location.reload(false)
            }}>Change active status</Button>
        );
    }
    const editButtonCell = (params) => {
        return (
            <Button
                onClick={() => {
                    setSelectedUserId(params.row.id)
                    setEditMode(true);
                    Axios.get("http://localhost:8085/user/" + params.row.id).then((response) => {
                        setEmail(response.data.email)
                        setIdDepartment(response.data.idDepartment)
                        setIdStatusUser(response.data.idStatusUser)
                        setSelectedDepartment(departments[response.data.idDepartment - 1])
                        setSelectedStatusUser(statusUsers[response.data.idStatus - 1])
                    })
                    setOpen(true);
                }}
                sx={{marginLeft: 1, backgroundColor: 'transparent', color: 'black', padding: '6px'}}
                startIcon={<ModeEditIcon/>}> </Button>
        )
    }

    const deleteButtonCell = (params) => {
        return (
            <Button variant="containted" startIcon={<DeleteIcon/>} onClick={() => {
                setSelectedUserId(params.row.id);
                setOpenConfirmation(true);
            }} sx={{color: 'red'}}></Button>
        )
    }

    const columnsWithButton = [
        ...columns.map((column) => ({field: column, width: 160})),
        {field: " ", renderCell: activateStatusButtonCell, width: 270},
        {field: "  ", renderCell: editButtonCell},
        {field: "   ", renderCell: deleteButtonCell}
    ];

    // MODAL
    const [open, setOpen] = useState(false);
    const [openConfirmation, setOpenConfirmation] = useState(false);

    const handleCloseConfirmation = () => {
        setOpenConfirmation(false)
    }

    const openAddModal = () => {
        setEditMode(false);
        setOpen(true);

        //reset to default values
        setEmail("")
        setPassword("")
        setIdStatusUser(0)
        setSelectedStatusUser({})
        setIdDepartment(0)
        setSelectedDepartment({})
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

    const addUser = () => {

        if (email.toString().trim() === "") {
            toast.error("Email must be completed!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
            });
        } else if (password.includes(" ")) {
            toast.error("Password must not have spaces!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
            });
        } else if (password.length < 6) {
            toast.error("Password must have at least 6 characters!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
            });
        } else if (/^[a-zA-Z0-9_.+-]+@gmail\.com$/.test(email) === false) {
            toast.error("The email must be example@gmail.com", {
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

            Axios.post("http://localhost:8085/user/create", {
                email: email,
                password: password,
                idDepartment: idDepartment,
                idStatusUser: idStatusUser
            })
            window.location.reload(false);
            handleClose();
        }

    }

    const editUser = () => {

        if (email.toString().trim() === "") {
            toast.error("Email must be completed!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
            })
        } else if (/^[a-zA-Z0-9_.+-]+@gmail\.com$/.test(email) === false) {
            toast.error("The email must be example@gmail.com", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
            })
        }

        if (password.length > 0) {
            if (password.includes(" ")) {
                toast.error("Password must not have spaces!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                });
            } else if (password.length < 6) {
                toast.error("Password must have at least 6 characters!", {
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

        if (password.length > 0) {
            Axios.put("http://localhost:8085/user/" + selectedUserId, {
                email: email,
                password: password,
                idDepartment: idDepartment,
                idStatus: idStatusUser
            })
            window.location.reload(false);
        } else {
            Axios.put("http://localhost:8085/user/" + selectedUserId, {
                email: email,
                idDepartment: idDepartment,
                idStatus: idStatusUser
            })
            window.location.reload(false);
        }
    }

    const deleteUser = () => {
        Axios.delete("http://localhost:8085/user/" + selectedUserId);
        window.location.reload(false);
        setOpenConfirmation(false);
    }

    return (
        <>
            <ToastContainer/>
            <Appbar/>
            <div className="management_panel_title">
                Users
            </div>
            <div className="mytasks_container_dataGrid">
                <div className="mytasks_dataGrid">
                    {columns.length > 0 ?

                        <DataGrid columns={columnsWithButton} rows={users}
                                  columnVisibilityModel={{password: false}}/>
                        : <></>}

                </div>
            </div>
            <div className="users_buttons">
                <Button variant="contained" onClick={openAddModal}>Add User</Button>
            </div>

            {/*Confirmation dialog for Delete*/}
            <Dialog
                open={openConfirmation}
                onClose={handleCloseConfirmation}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Do you confirm deleting this user? "}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleCloseConfirmation}>Decline</Button>
                    <Button onClick={deleteUser} autoFocus>Confirm</Button>
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
                    {editMode ? <h3>Edit User</h3> : <h3>Add User</h3>}

                    <TextField
                        id="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        label="Email"
                        variant="outlined"
                    />
                    <TextField
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                    />

                    {departments.length > 0 ?
                        <Autocomplete
                            disablePortal
                            id="combo-box-departments"
                            options={departments}
                            getOptionLabel={(option) => option.name || ""}
                            sx={{width: 300}}
                            value={selectedDepartment}
                            onChange={(event, value) => {
                                setIdDepartment(value.id)
                                setSelectedDepartment(value)
                            }}
                            renderInput={(params) => <TextField {...params} label="Department"/>}
                        />
                        : <></>}

                    {statusUsers.length > 0 ?
                        <Autocomplete
                            disablePortal
                            id="combo-box-statusUsers"
                            options={statusUsers}
                            getOptionLabel={(option) => option.name || ""}
                            sx={{width: 300}}
                            value={selectedStatusUser}
                            onChange={(event, value) => {
                                setIdStatusUser(value.id)
                                setSelectedStatusUser(value)
                            }}
                            renderInput={(params) => <TextField {...params} label="Status User"/>}
                        />
                        : <></>}
                    {editMode ? <Button variant="contained" onClick={editUser}>Edit</Button> :
                        <Button variant="contained" onClick={addUser}>Add</Button>}
                </Box>

            </Modal>


        </>
    )
}
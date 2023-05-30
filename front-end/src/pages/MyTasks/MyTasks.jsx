//HOOKS
import {useEffect, useState} from "react";

// ROUTING
import {useNavigate} from "react-router-dom";

// USER MADE COMPONENTS
import Appbar from "../../components/Appbar/Appbar";

//MATERIAL UI
import Button from '@mui/material/Button';
import {DataGrid} from '@mui/x-data-grid';

//AXIOS
import Axios from "axios"

// CSS
import "./MyTasks.css"

export default function MyTasks() {

    const [tasks, setTasks] = useState([])
    const [columns, setColumns] = useState([])
    const [selectedRow, setSelectedRow] = useState({})

    const account = JSON.parse(localStorage.getItem("myAccount"))
    const idAccount = account.data.id;

    const navigate = useNavigate();

    useEffect(() => {
        Axios.get("http://localhost:8085/task/user/" + idAccount).then((response) => {
            setTasks(response.data)
            setColumns(Object.keys(response.data[0]))
        })

    }, [])

    const selectRow = (selectedRow) => {
        setSelectedRow(selectedRow.row)
    }

    const renderButtonCell = (params) => {
        return (
            <Button variant="contained" onClick={() => {
                navigate("/task/" + params.row.id)
            }}>View</Button>
        );
    }

    const columnsWithButton = [
        ...columns.map((column) => ({field: column, width: 140})),
        {field: " ", renderCell: renderButtonCell},
    ];


    return (
        <>
            <Appbar/>
            <div className="panel_title">
                My Tasks
            </div>

            <div className="mytasks_container_dataGrid">
                <div className="mytasks_dataGrid">
                    {columnsWithButton.length > 0 ?
                        <DataGrid columns={columnsWithButton} rows={tasks} onRowClick={(row) => {
                            selectRow(row)
                        }}/>
                        : <> You don't have assigned tasks! </>
                    }
                </div>
            </div>

        </>
    )
}
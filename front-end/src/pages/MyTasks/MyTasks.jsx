import Appbar from "../../components/Appbar/Appbar";
import { DataGrid } from '@mui/x-data-grid';
import {useState, useEffect} from "react";
import Button from '@mui/material/Button';
import Axios from "axios"
export default function MyTasks() {

	const account = JSON.parse(localStorage.getItem("myAccount"))
	const idAccount = account.data.id;

	const [tasks,setTasks] = useState([])
	const [columns,setColumns] = useState([])
	const [selectedRow, setSelectedRow] = useState({})

	useEffect(()=>{
		Axios.get("http://localhost:8085/task/user/"+idAccount).then((response) =>{
			setTasks(response.data)
			setColumns(Object.keys(response.data[0]))
		})

	},[])

	const selectRow = (selectedRow) =>{
		setSelectedRow(selectedRow.row)
		console.log(selectedRow.row)
	}

	const renderButtonCell = (params) =>{
		return (
			<Button variant="contained" onClick={() => selectRow(params)}>View</Button>
		);
	}

	const columnsWithButton = [
		...columns.map((column) => ({ field: column,width:140 })),
		{ field: " ", renderCell: renderButtonCell },
	];


	return (
		<>
			<Appbar/>
			 My Tasks
			{columns.length > 0 && (
				<DataGrid columns={columnsWithButton}  rows={tasks}/>
			)}


		</>
	)
}
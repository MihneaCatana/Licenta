// ROUTER
import {useNavigate} from "react-router-dom";

// USER MADE COMPONENTS
import Appbar from "../../components/Appbar/Appbar";

// MATERIAL UI
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';

// CSS
import "./ManagementPanel.css"


export default function ManagementPanel() {

    const navigate = useNavigate();

    const navigateUsers = () => {
        navigate("/users")
    }

    const navigateDepartments = () => {
        navigate("/departments")
    }

    const navigateProjects = () => {
        navigate("/projects")
    }

    const navigateTasks = () => {
        navigate("/tasks")
    }

    return (
        <>
            <Appbar/>
            <div className="panel_title">
                Management Panel
            </div>
            <div className="management_cards_container">
                <div className="management_card" onClick={navigateUsers}>
                    <PersonIcon sx={{fontSize: 120}}/>
                    <p style={{fontSize: 40}}>Users</p>
                </div>
                <div className="management_card" onClick={navigateDepartments}>
                    <GroupsIcon sx={{fontSize: 120}}/>
                    <p style={{fontSize: 40}}>Departments</p>
                </div>
                <div className="management_card" onClick={navigateProjects}>
                    <EmojiObjectsOutlinedIcon sx={{fontSize: 120}}/>
                    <p style={{fontSize: 40}}>Projects</p>
                </div>
                <div className="management_card" onClick={navigateTasks}>
                    <AssignmentOutlinedIcon sx={{fontSize: 120}}/>
                    <p style={{fontSize: 40}}>Tasks</p>
                </div>

            </div>
        </>
    )
}
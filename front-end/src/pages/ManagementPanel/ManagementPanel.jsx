import Appbar from "../../components/Appbar/Appbar";
import "./ManagementPanel.css"
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';

export default function ManagementPanel() {
	return (
		<>
		<Appbar/>
			<div className="management_panel_title">
			Management Panel
			</div>
			<div className="management_cards_container">
				<div className="management_card">
					<PersonIcon sx={{fontSize:120}}/>
					<p style={{fontSize:40}}>Users</p>
				</div>
				<div className="management_card">
					<GroupsIcon sx={{fontSize:120}}/>
					<p style={{fontSize:40}}>Departments</p>
				</div>
			</div>
		</>
	)
}
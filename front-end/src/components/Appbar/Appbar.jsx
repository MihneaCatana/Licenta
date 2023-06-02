import {useState} from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import "./Appbar.css";
import {useNavigate} from "react-router-dom";

export default function Appbar() {
    const navigate = useNavigate();

    const account = JSON.parse(localStorage.getItem("myAccount"))

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const mytasks = () => {
        navigate("/mytasks")
    }

    const profile = () => {
        navigate("/profile");
    };

    const managementPanel = () => {
        navigate("/management");
    };

    const logout = () => {
        navigate("/login");
        localStorage.clear();
    };

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <h2
                        className="navbar_icon"
                        onClick={() => {
                            navigate("/homepage");
                        }}
                    >
                        wePlan
                    </h2>
                    <Typography
                        className="navbar"
                        variant="h6"
                        component="div"
                        sx={{flexGrow: 1}}
                    ></Typography>
                    <div className="navbar_links">
                        <Button
                            id="demo-positioned-button"
                            aria-controls={open ? "demo-positioned-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            sx={{color: "white"}}
                            onClick={handleClick}
                        >
                            <MenuIcon/>
                        </Button>
                        <Menu
                            id="demo-positioned-menu"
                            aria-labelledby="demo-positioned-button"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                        >
                            <MenuItem onClick={profile}>Profile</MenuItem>
                            <MenuItem onClick={mytasks}>My tasks</MenuItem>
                            {account.data.idStatus == 2 || account.data.idStatus == 3 ?
                                <MenuItem onClick={managementPanel}>Management Panel</MenuItem> :
                                <MenuItem sx={{display: 'none'}}></MenuItem>}
                            <MenuItem onClick={logout}>Logout</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

//HOOKS
import {useEffect, useState} from "react";

//USER MADE COMPONENTS
import Appbar from "../../components/Appbar/Appbar";
import PieChart from "../../components/PieChart/PieChart";

//MATERIAL UI
import {DateCalendar} from '@mui/x-date-pickers/DateCalendar';
import {Box} from '@mui/system';
import {Badge} from "@mui/material";
import {PickersDay} from "@mui/x-date-pickers";

// CSS
import "./Homepage.css"

//AXIOS
import Axios from "axios"


export default function Homepage() {

    const [tasks, setTasks] = useState([])

    const myIdUser = JSON.parse(localStorage.getItem("myAccount")).data

    useEffect(() => {
        Axios.get("http://localhost:8085/task").then((response) => {
            setTasks(response.data)


        })

    }, [])

    const finishedTasks = tasks.filter((element) => element.finishedTime && element.idUser === myIdUser.id)
    const unfinishedTasks = tasks.filter((element) => !element.finishedTime && element.idUser === myIdUser.id)

    function HighlightDay(props) {
        const {day} = props;

        const isSelected = !props.outsideCurrentMonth &&
            unfinishedDates.some(date => date.getDate() === day.date()
                && date.getMonth() === day.month() && date.getFullYear() == day.year());

        return (
            <Badge
                key={day.toString()}
                overlap="circular"
                badgeContent={isSelected ? "❗" : undefined}
                sx={isSelected ? {backgroundColor: "#f60a0a", fontWeight: 'bold', borderRadius: 3} : undefined}
            >
                <PickersDay
                    isFirstVisibleCell={false}
                    isLastVisibleCell={false}
                    onDaySelect={() => {
                    }}
                    outsideCurrentMonth={false}
                    day={day}

                />
            </Badge>
        );
    }

    const unfinishedDates = unfinishedTasks.map(function (task) {
        const dateTask = new Date(task.deadline);
        return dateTask;

    })


    return (
        <>
            <Appbar/>
            <div className="panel_title">
                Homepage
            </div>
            <div className="divided_statistics">
                <div className="mystats">
                    <div className="card_homepage">
                        <div className="panel_title">
                            My tasks
                        </div>
                        {unfinishedTasks.length > 0 || finishedTasks.length > 0 ?
                            <PieChart data1={finishedTasks} data2={unfinishedTasks}/> : <></>}
                    </div>
                </div>
                <div className="mystats">
                    <div className="card_homepage">
                        <div className="panel_title">
                            My Calendar
                        </div>
                        {unfinishedDates.length > 0 ? <DateCalendar slots={{
                            day: HighlightDay
                        }} slotProps={
                            {

                                day: {unfinishedDates}
                            }
                        }/> : <> You finished all of your tasks! <br/><br/> <b>Congratulations for being
                            productive!</b> </>}

                    </div>

                </div>

            </div>
        </>
    );
}

import {useState} from "react";
import Movie from "./Movie";
import PropTypes from "prop-types";

function SetDate({onPickChange}){
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()-1).padStart(2, '0');
    const currentDate = `${year}-${month}-${day}`;

    const [pick, setPick ] = useState("");

    function onPick(e) {
        const newDate = e.target.value;
        setPick(newDate);
        onPickChange(newDate);
    }


    return <div className={"set_new_date"}>
        <span className={"ico_date"}> </span>
        <input type={"date"} max={currentDate} onChange={onPick} />
    </div>
}

SetDate.propTypes = {
    onPickChange: PropTypes.func.isRequired,
}

export default SetDate;
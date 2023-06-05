import {useState} from "react";
import {Link} from "react-router-dom";

function DateData() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()-1).padStart(2, '0');
    const currentDate = `${year}-${month}-${day}`;
    const [pick, setPick ] = useState("");
    const [date, setDate ] = useState("")

    function onPick(e) { setPick(e.target.value); }
    function onDate() {
        setDate(pick.replace(/-/g, ''));
    }
    return <div>
        <h3>{month}월 {day}일부터 검색 가능합니다</h3>
        <input type={"date"} max={currentDate} onChange={onPick} />
        <Link to={`/${date}`}><button onClick={onDate} >검색</button></Link>
    </div>
}

export default DateData
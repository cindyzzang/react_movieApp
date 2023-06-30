import {useState} from "react";
import {Link} from "react-router-dom";


function SetWeeklyDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const currentDate = `${year}-${month}-${day}`;
    const [pick, setPick ] = useState("");
    const [date, setDate ] = useState("");

    function onPick(e) { setPick(e.target.value); }
    function onDate() {
        setDate(pick.replace(/-/g, ''));
    }

    return <div>
        <h1>주간 박스 오피스 조회</h1>
        <Link to={`/daily`}><button>일일 박스오피스</button></Link>
        <p>{month}월 {day}일부터 검색 가능합니다</p>
        <input type={"date"} max={currentDate} onChange={onPick} />
        <Link to={`/weekly/${date}`}>
            <button onClick={onDate} >검색</button>
        </Link>

    </div>
}

export default SetWeeklyDate
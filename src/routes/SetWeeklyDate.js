import {useState} from "react";
import {Link} from "react-router-dom";


function SetWeeklyDate() {
    const today = new Date();
// 오늘 요일 값(0: 일요일, 1: 월요일, ..., 6: 토요일)
    const currentDayOfWeek = today.getDay();
// 저번 주 일요일을 구하기 위해 현재 요일 값에 따라 조정
    const daysToSubtract = currentDayOfWeek === 0 ? 7 : currentDayOfWeek;
    const lastSunday = new Date(today);
    lastSunday.setDate(today.getDate() - daysToSubtract);
// 저번 주 일요일의 연도, 월, 일 추출
    const lastSundayYear = lastSunday.getFullYear();
    const lastSundayMonth = String(lastSunday.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더해줌
    const lastSundayDate = String(lastSunday.getDate()).padStart(2, '0');
// 저번 주 일요일 날짜 출력 (YYYY-MM-DD 형식)
    const lastSundayFormatted = `${lastSundayYear}-${lastSundayMonth}-${lastSundayDate}`;
    const [pick, setPick ] = useState("");
    const [date, setDate ] = useState("");

    function onPick(e) { setPick(e.target.value); }
    function onDate() {
        setDate(pick.replace(/-/g, ''));
    }

    return <div>
        <Link to={`/`}><button>뒤로가기</button></Link>
        <h1>주간 박스 오피스 조회</h1>
        <Link to={`/daily`}><button>일일 박스오피스</button></Link>
        <p>{lastSundayMonth}월 {lastSundayDate}일부터 검색 가능합니다</p>
        <input type={"date"} max={lastSundayFormatted} onChange={onPick} />
        <Link to={`/weekly/${date}`}>
            <button onClick={onDate} >검색</button>
        </Link>

    </div>
}

export default SetWeeklyDate
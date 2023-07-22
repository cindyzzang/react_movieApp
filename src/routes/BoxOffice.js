import {useEffect, useState} from "react";
import Movie from "../components/Movie";
import {Link} from "react-router-dom";
import "../styles/BoxOffice.css"

function BoxOffice() {
    const [loading, setLoading] = useState(true);
    const [movies, setMoives] = useState([]);
    const [range, setRange] = useState("")
    const [choice, setChoice] = useState(true)

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const searchDailydate = year + month + String(today.getDate()-1).padStart(2, '0');
    const currentDayOfWeek = today.getDay(); // 오늘 요일 값(0: 일요일, 1: 월요일, ..., 6: 토요일)
    const daysToSubtract = currentDayOfWeek === 0 ? 7 : currentDayOfWeek; // 저번 주 일요일을 구하기 위해 현재 요일 값에 따라 조정
    const lastSundayDate = String(today.getDate()- daysToSubtract).padStart(2, '0');
    const lastSundayFormatted = `${year}${month}${lastSundayDate}`;
    const searchDate = choice ? searchDailydate : lastSundayFormatted
    const [DateData, setDateData] = useState(searchDate)
    function onClick() {
        setChoice(!choice)
    }

    // function onPlus() {
    //     setDateData((prevDate) =>
    //         choice ? String(Number(prevDate) + 1) : (lastSundayFormatted <= prevDate ? prevDate : String(Number(prevDate) + 7))
    //     );
    // }
    //
    // function onMinus() {
    //     return choice ? Number(searchDate-1) :
    //         (lastSundayFormatted <= searchDate) ? searchDate : Number(searchDate-7)
    // }

    useEffect(() => {
        const getMovies = async() => {
            if (choice) {
                const json = await (await fetch(
                `https://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=de7816a233ab3abe2ec92149df1f5974&targetDt=${searchDate}`
            )).json();

                if (json.boxOfficeResult) {
                    setMoives(json.boxOfficeResult.dailyBoxOfficeList);
                    setLoading(false);
                }
            } else {
                const json = await (await fetch(
                    `https://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json?weekGb=0&key=de7816a233ab3abe2ec92149df1f5974&targetDt=${searchDate}`
                )).json();

                if (json.boxOfficeResult) {
                    setMoives(json.boxOfficeResult.weeklyBoxOfficeList);
                    setRange(json.boxOfficeResult.showRange);
                    setLoading(false);
                }
            }
        }
        getMovies()
    },[searchDate]);

    return <div className={"content"}>
            <div className={"dateBox"}>
                <Link to={`/daily`}><button>뒤로 가기</button></Link>

                <button onClick={onMinus} className={"ico ico_prev"}>전</button>
                    {choice ? <h1>{searchDate}</h1> : <h1>{range}</h1>}
                <button  className={"ico ico_next"}>후</button>
                <button onClick={onClick}>{choice ? `주간 박스오피스` : `일일 박스오피스`}</button>
                <input type={"date"} className={"ico_calendar "}/>
            </div>
            {loading ?
                <h1>Loading...</h1> :
                movies.map((movie) => (
                    <div className={"movieBox"} key={movie.rnum}>
                        <Movie
                            date={searchDate}
                            openDate={movie.openDt}
                            id={movie.rnum}
                            rank={movie.rank}
                            movieName={movie.movieNm}
                            audiAcc={movie.audiAcc}
                        />
                    </div>
                ))
            }
    </div>
}

export default BoxOffice
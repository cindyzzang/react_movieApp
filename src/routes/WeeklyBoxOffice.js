import {useEffect, useState} from "react";
import Movie from "../components/Movie";
import {useParams,Link} from "react-router-dom";


function WeeklyBoxOffice() {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const [range, setRange] = useState("")
    const {date} = useParams()

    useEffect(() => {
        function formattedDate(str) {
            const year = str.slice(0, 4);
            const month = str.slice(4, 6);
            const day = str.slice(6, 8);
            return `${year}년 ${month}월 ${day}일`;}
        const getMovies = async() => {
            //if (!date)  // date 값이 없을 경우 처리

            const json = await (await fetch(
                `https://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json?weekGb=0&key=de7816a233ab3abe2ec92149df1f5974&targetDt=${date}`
            )).json();

            if (json.boxOfficeResult) {
                setMovies(json.boxOfficeResult.weeklyBoxOfficeList);
                setRange(json.boxOfficeResult.showRange);
                setLoading(false);
            }
        };
        getMovies()
    },[date]);


    return <div className={"content"}>
            <div className={"dateBox"}>
                <Link to='/weekly'><button>뒤로 가기</button></Link>
                <h1>{range}</h1>
                <Link to='/daily'><button>{"일일 박스오피스"}</button></Link>
            </div>
            {loading ?
                <h1>Loading...</h1> :
                movies.map((movie) => (
                    <div className={"movieBox"} key={movie.rnum}>
                        <Movie
                            date={date}
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

export default WeeklyBoxOffice

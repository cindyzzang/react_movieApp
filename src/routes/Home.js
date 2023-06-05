import {useEffect, useState} from "react";
import Movie from "../components/Movie";


function Home() {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
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

    useEffect(() => {
        const getMovies = async() => {
        if (!date) return; // date 값이 없을 경우 처리

        const json = await (await fetch(
            `https://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=de7816a233ab3abe2ec92149df1f5974&targetDt=${date}`
        )).json();

        if (json.boxOfficeResult) {
            setMovies(json.boxOfficeResult.dailyBoxOfficeList);
            setLoading(false);
        }
    };
        getMovies()
    },[date]);

    return (
        <div>
            {date ? (
                loading ? (
                    <h1>Loading...</h1>
                ) : (
                    movies.map((movie) => (
                        <Movie
                            key={movie.rnum}
                            date={date}
                            id={movie.rnum}
                            rank={movie.rank}
                            movieName={movie.movieNm}
                        />
                    ))
                )
            ) : (
                    <div>
                        <h3>{month}월 {day}일부터 검색 가능합니다</h3>
                        <input type={"date"} max={currentDate} onChange={onPick}/>
                        <button onClick={onDate}>검색</button>
                    </div>
            )}
        </div>
    )};

export default Home;
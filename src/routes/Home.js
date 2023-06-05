import {useEffect, useState} from "react";
import Movie from "../components/Movie";
import {useParams} from "react-router-dom";


function Home() {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const {date} = useParams()

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
            {loading ?
                    <h1>Loading...</h1> :
                    movies.map((movie) => (
                        <Movie
                            key={movie.rnum}
                            date={date}
                            id={movie.rnum}
                            rank={movie.rank}
                            movieName={movie.movieNm}
                        />
                    ))
            }
        </div>
    )}

export default Home;
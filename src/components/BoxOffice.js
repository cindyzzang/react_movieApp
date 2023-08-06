import {useEffect, useState} from "react";
import Movie from "./Movie";
import "../styles/BoxOffice.css"


function BoxOffice() {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const [range, setRange] = useState("")
    const [choice, setChoice] = useState(true)

    const today = new Date();
    const year = today.getFullYear();
    const month = ("0" + (today.getMonth() + 1)).slice(-2);
    const date = ("0" + (today.getDate())).slice(-2);
    const searchDate = year + month + date-1
    const currentDayOfWeek = today.getDay(); // 오늘 요일 값(0: 일요일, 1: 월요일, ..., 6: 토요일)
    const daysToSubtract = currentDayOfWeek === 0 ? 7 : currentDayOfWeek; // 저번 주 일요일을 구하기 위해 현재 요일 값에 따라 조정
    const [dateData, setDateData] = useState(searchDate)


    function onClick() {
        setChoice(!choice)
        if (!choice) {
            today.setDate(today.getDate() - 1 ); //
        } else {
            today.setDate(today.getDate() - daysToSubtract); //
        }
        // 날짜를 변경한 후에 새로운 날짜를 읽습니다.
        const year = today.getFullYear();
        const month = ("0" + (today.getMonth() + 1)).slice(-2);
        const date = ("0" + today.getDate()).slice(-2);
        setDateData(year + month + date);
    }


    function onPlus() {
        setDateData((prevDate) => {
            if(!choice){
                const prevDateString = String(prevDate);

                const prevDateObject = new Date(
                    prevDateString.slice(0, 4),
                    prevDateString.slice(4, 6) - 1,  // month는 0부터 시작하므로 1을 빼줍니다.
                    prevDateString.slice(6, 8)
                );

                const nextDateObject = new Date(prevDateObject.getTime());
                nextDateObject.setDate(nextDateObject.getDate() + 7);  // 일주일을 증가시킵니다.

                const today = new Date();
                if (nextDateObject > today) {
                    alert("The date cannot be in the future!");
                    return prevDate;
                } else {
                    const year = nextDateObject.getFullYear();
                    const month = ("0" + (nextDateObject.getMonth() + 1)).slice(-2); // 월은 0부터 시작하므로 1을 더해줍니다.
                    const date = ("0" + nextDateObject.getDate()).slice(-2);

                    return year + month + date;  }// "YYYYMMDD" 형식의 문자열을 반환합니다
            } else {
                const prevDateString = String(prevDate);

                const prevDateObject = new Date(
                    prevDateString.slice(0, 4),
                    prevDateString.slice(4, 6) - 1,  // month는 0부터 시작하므로 1을 빼줍니다.
                    prevDateString.slice(6, 8)
                );

                prevDateObject.setDate(prevDateObject.getDate() + 1);  // 하루를 증가시킵니다.

                const year = prevDateObject.getFullYear();
                const month = ("0" + (prevDateObject.getMonth() + 1)).slice(-2); // 월은 0부터 시작하므로 1을 더해줍니다.
                const date = ("0" + prevDateObject.getDate()).slice(-2);

                return year + month + date;  // "YYYYMMDD" 형식의 문자열을 반환합니다
            }
        });
    }
    function onMinus() {
      setDateData((prevDate) => {
          if(!choice){
              const prevDateString = String(prevDate);

              const prevDateObject = new Date(
                  prevDateString.slice(0, 4),
                  prevDateString.slice(4, 6) - 1,  // month는 0부터 시작하므로 1을 빼줍니다.
                  prevDateString.slice(6, 8)
              );

              prevDateObject.setDate(prevDateObject.getDate() - 7);  // 하루를 감소시킵니다.

              const year = prevDateObject.getFullYear();
              const month = ("0" + (prevDateObject.getMonth() + 1)).slice(-2); // 월은 0부터 시작하므로 1을 더해줍니다.
              const date = ("0" + prevDateObject.getDate()).slice(-2);

              return year + month + date;  // "YYYYMMDD" 형식의 문자열을 반환합니다
          }else {
              const prevDateString = String(prevDate);

              const prevDateObject = new Date(
                  prevDateString.slice(0, 4),
                  prevDateString.slice(4, 6) - 1,  // month는 0부터 시작하므로 1을 빼줍니다.
                  prevDateString.slice(6, 8)
              );

              prevDateObject.setDate(prevDateObject.getDate() - 1);  // 하루를 감소시킵니다.

              const year = prevDateObject.getFullYear();
              const month = ("0" + (prevDateObject.getMonth() + 1)).slice(-2); // 월은 0부터 시작하므로 1을 더해줍니다.
              const date = ("0" + prevDateObject.getDate()).slice(-2);

              return year + month + date;  // "YYYYMMDD" 형식의 문자열을 반환합니다
          }
      });
    }


    useEffect(() => {
        const getMovies = async() => {
            if (choice) {
                const json = await (await fetch(
                `https://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=de7816a233ab3abe2ec92149df1f5974&targetDt=${dateData}`
            )).json();

                if (json.boxOfficeResult) {
                    setMovies(json.boxOfficeResult.dailyBoxOfficeList);
                    setLoading(false);
                }
            } else {
                const json = await (await fetch(
                    `https://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json?weekGb=0&key=de7816a233ab3abe2ec92149df1f5974&targetDt=${dateData}`
                )).json();

                if (json.boxOfficeResult) {
                    setMovies(json.boxOfficeResult.weeklyBoxOfficeList);
                    setRange(json.boxOfficeResult.showRange);
                    setLoading(false);
                }
            }
        }
        getMovies()
    },[dateData, choice]);



    return <div className={"content"}>
            <div className={"content_header"}>
                <h2>박스오피스</h2>
                <div className={"date_box"} >
                    <button onClick={onMinus} className={"ico ico_prev"}>전</button>
                    {choice ? <h1>{dateData}</h1> : <h1>{range}</h1>}
                    <button onClick={onPlus} className={"ico ico_next"}>후</button>
                </div>
                <div className={"change_range"}>
                    <button onClick={onClick}>{choice ? `주간` : `일일`}</button>
                </div>
            </div>

            {loading ?
                <h1>Loading...</h1> :
                movies.map((movie) => (
                    <div className={"movie_box"} key={movie.rnum}>
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
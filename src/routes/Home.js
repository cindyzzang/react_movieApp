import {useEffect, useState} from "react";
import Movie from "../components/Movie";
import DailyBoxOffice from "./DailyBoxOffice";
import {useParams,Link} from "react-router-dom";
import WeeklyBoxOffice from "./WeeklyBoxOffice";
import "./Home.css"


function Home() {
    const [invert,setInvert] = useState(false)
    const {date} = useParams()
    function onInvert() {
        setInvert(invert => !invert)
    }

    return (
        <div className={"container"}>
            <Link to={'/daily'}>일일 박스오피스</Link>
            <Link to={'/weekly'}>주간 박스오피스</Link>
        </div>
    )}

export default Home;
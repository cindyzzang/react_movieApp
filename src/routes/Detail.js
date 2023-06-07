import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

function Detail() {
    const [loading, setLoding] = useState(true);
    const [detail,setDetail] = useState(null);
    const {id} = useParams()
    const {date} = useParams()
    function formattedString(str) {return str.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
    function formattedDate(str) {
        const year = str.slice(0, 4);
        const month = str.slice(4, 6);
        const day = str.slice(6, 8);
        return `${year}년 ${month}월 ${day}일`;}
    const getMovie = async () => {
        const json = await(
            await fetch(`https://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=de7816a233ab3abe2ec92149df1f5974&targetDt=${date}`)
        ).json();
        setDetail(json.boxOfficeResult.dailyBoxOfficeList[parseInt(id)-1]);
        setLoding(false)
    }
    useEffect(()=>{
        getMovie()
        },[])
    return (
        loading ?
            <h1>Loading... </h1>
            :
                <div>

                    <h1>{detail.rank}위</h1>
                    <h3>{detail.movieNm}</h3>
                    <p>개봉일 : {detail.openDt}<br/>
                        누적관객수 : {formattedString(detail.audiAcc)}명<br/>
                        {formattedDate(date)} 관객수 : {formattedString(detail.audiCnt)}명
                    </p>
                </div>

    )
}
//const numberString = "1244321";
//

export default Detail
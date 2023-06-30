import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
//import movie from "../components/Movie";

function Detail() {
    const [loading, setLoding] = useState(true);
    const [detail,setDetail] = useState(null);
    const [kdbmApi,setKdbmApi] = useState("")
    const {id} = useParams()
    const {date} = useParams()
        console.log(id)
    console.log(date)
    function formattedString(str) {return str.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
    function transformTitle(title) {
        return title.replace(/!HS/g, "").replace(/!HE/g, "").replace(/^\s+|\s+$/g, "").replace(/ +/g, "");
    }
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
    }
    const getKdbmApi = async () => {
        if (!detail || !detail.movieNm || !detail.openDt) return; // detail 값이 없거나 movieNm, openDt 값이 없을 경우 처리

        const json = await (await fetch(
            `https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&detail=Y&ServiceKey=IXI939389P5J03DNHZ78&title=${detail.movieNm}&releaseDts=${detail.openDt.replace(/-/g,"")}`
        )).json();

        if (json.Data && json.Data[0] && json.Data[0].Result && json.Data[0].Result[0] ) {
            const movieTitle = transformTitle(detail.movieNm);
            const resultTitle = transformTitle(json.Data[0].Result[0].title);

            if (movieTitle === resultTitle){
                setKdbmApi(json.Data[0].Result[0]);
                setLoding(false)
            }
        }

    };
    useEffect(()=>{
        getMovie()
        },[])

    useEffect(() => {
        getKdbmApi()
    },[detail])

    const urls = kdbmApi.posters ? kdbmApi.posters.split("|") : []; //poster가 존재할 경우에만 split 메서드 사용

    console.log(date)
    console.log(id)
    return (
        loading ?
            <h1>Loading... </h1>
            :
                <div>
                    <h1>{detail.rank}위</h1>
                    <img src={urls[0]} alt={detail.movieNm}/>
                    <h3>{detail.movieNm}</h3>
                    <p> 장르 : {kdbmApi.genre}<br/>
                        줄거리 : {kdbmApi.plots.plot[0].plotText} <br/>
                        출연 : {kdbmApi.actors.actor.map((actor)=>`${actor.actorNm}, `)}<br/>
                        개봉일 : {detail.openDt}<br/>
                        누적관객수 : {formattedString(detail.audiAcc)}명<br/>
                        {formattedDate(date)} 관객수 : {formattedString(detail.audiCnt)}명 <br/>
                        <li>{kdbmApi.stlls.split("|").map((image, idx) => <img src={image} key={idx} alt="" />)}</li>

                    </p>
                </div>

    )
}


export default Detail
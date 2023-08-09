import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import React from "react";

import "../styles/Detail.css"

function Detail() {
    const [loading, setLoding] = useState(true);
    const [detail,setDetail] = useState(null);
    const [kdbmApi,setKdbmApi] = useState("")
    const {id} = useParams()
    const {date} = useParams()


    function formattedString(str) {return str.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
    function transformTitle(title) {
        return title.replace(/!HS/g, "").replace(/!HE/g, "").replace(/^\s+|\s+$/g, "").replace(/ +/g, "");
    }

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


    function splitSentences(text) {
        text = text.split("...!").join("~")
        text = text.split("...").join("-")
        text = text.split("!").join("!\n")
        text = text.split(".").join(".\n")
        text = text.split("~").join("...!\n")
        return text.split("-").join("...\n")
    }
    console.log(kdbmApi)
    const urls = kdbmApi.posters ? kdbmApi.posters.split("|") : []; //poster가 존재할 경우에만 split 메서드 사용
    return (
        loading ?
            <h1>Loading... </h1>
            :
                <div className={"detail_wrap"}>
                    <div className={"detail_basic"}>
                        <img src={urls[0]} alt={detail.movieNm}/>
                        <div className={"detail_inner"}>
                            <div className={"detail_title"}>
                                <h1>{detail.movieNm}</h1>
                                <span>{kdbmApi.titleEng.split(" (")[0]}, {kdbmApi.prodYear}</span>
                            </div>
                            <div className={"detail_cont"}>
                                <div className={"detail_info"}>
                                    <dl className={"list_info"}>
                                        <dt>
                                            개봉
                                        </dt>
                                        <dd>
                                            {detail.openDt.split('-').join('.')}
                                        </dd>
                                    </dl>
                                    <dl className={"list_info"}>
                                        <dt>
                                            장르
                                        </dt>
                                        <dd>
                                            {kdbmApi.genre}
                                        </dd>
                                    </dl>
                                    <dl className={"list_info"}>
                                        <dt>
                                            국가
                                        </dt>
                                        <dd>
                                            {kdbmApi.nation}
                                        </dd>
                                    </dl>
                                    <dl className={"list_info"}>
                                        <dt>
                                            등급
                                        </dt>
                                        <dd>
                                            {kdbmApi.rating}
                                        </dd>
                                    </dl>
                                </div>
                                <div className={"detail_info"}>
                                    <dl className={"list_info"}>
                                        <dt>
                                            러닝타임
                                        </dt>
                                        <dd>
                                            {kdbmApi.runtime}분
                                        </dd>
                                    </dl>
                                    <dl className={"list_info"}>
                                        <dt>
                                            누적관객
                                        </dt>
                                        <dd>
                                            {formattedString(detail.audiAcc)}명
                                        </dd>
                                    </dl>
                                    <dl className={"list_info"}>
                                        <dt>
                                            박스오피스
                                        </dt>
                                        <dd>
                                            {detail.rnum}위
                                        </dd>
                                    </dl>
                                </div>
                            </div>

                        </div>

                    </div>
                    <nav>
                        <a href={"#summary"}>주요정보</a>
                        <a href={"#crew"}>출연/제작</a>
                        <a href={"#photo"}>포토</a>
                    </nav>
                    <div className={"detail_content"} >
                        <div className={"movie_summary"} id={"summary"}>
                            <h2>주요정보</h2>
                            <p>{splitSentences(kdbmApi.plots.plot[0].plotText)}</p>
                        </div>
                        <div className={"movie_crew"} id={"crew"}>
                            <h2>출연진</h2>
                            <dl>
                                <dt>감독</dt>
                                <dl>{kdbmApi.directors.director[0].directorNm}</dl>
                            </dl>
                            <dl>
                                <dt>출연</dt>
                                <dl>{kdbmApi.actors.actor.map((actor, index) => <span key={index}>{actor.actorNm}</span>)}</dl>
                            </dl>
                        </div>
                        <div className={"movie_media"} id={"photo"}>
                            <h2>포토</h2>
                            <ul className={"detail_photo"}>
                                <li>{kdbmApi.stlls.split("|").map((image, idx) => <img src={image} key={idx} alt="" />)}</li>
                            </ul>
                        </div>
                    </div>
                </div>

    )
}


export default Detail
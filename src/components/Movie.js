import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

function Movie({id,rank,movieName,date,openDate}) {

    function transformTitle(title) {
        return title.replace(/!HS/g, "").replace(/!HE/g, "").replace(/^\s+|\s+$/g, "").replace(/ +/g, "");
    }
    const [poster,setPoster] = useState("")
    useEffect(() => {
        const getPoster = async () => {
            //if (!movieName) return; // movieName 값이 없을 경우 처리

            const json = await (await fetch(
                `https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&detail=Y&ServiceKey=IXI939389P5J03DNHZ78&title=${movieName}&releaseDts=${openDate.replace(/-/g,"")}`
            )).json();

            if (json.Data && json.Data[0] && json.Data[0].Result && json.Data[0].Result[0] ) {
                const movieTitle = transformTitle(movieName);
                const resultTitle = transformTitle(json.Data[0].Result[0].title);

                if (movieTitle === resultTitle){
                    setPoster(json.Data[0].Result[0].posters);
                }
            }
        };
        getPoster();
    }, []);

    const urls = poster ? poster.split("|") : []; //poster가 존재할 경우에만 split 메서드 사용


    return <div>
        <h3>{rank}위</h3>
        {urls.length > 0 && <img src={urls[0]} alt={movieName} style={{ width: '200px' }} />} <br/>
        <Link to={process.env.PUBLIC_URL + `/${date}/${id}`}>
            {movieName}

        </Link>

    </div>
}

Movie.propTypes = {
    id: PropTypes.string.isRequired,
    rank: PropTypes.string.isRequired,
    movieName: PropTypes.string.isRequired,

}

export default Movie
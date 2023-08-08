import PropTypes, {number} from "prop-types";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {getMovieData} from "../utils/Api";
import styles from "../styles/Movie.module.css"


function Movie({id,rank,movieName,date,openDate,audiAcc}) {

    function transformTitle(title) {
        return title.replace(/!HS/g, "").replace(/!HE/g, "").replace(/^\s+|\s+$/g, "").replace(/ +/g, "");
    }
    const [poster,setPoster] = useState("")
    const [rating,setRating] = useState("")
    useEffect(() => {
        const getData = async () => {
            //if (!movieName) return; // movieName 값이 없을 경우 처리

            const json = await getMovieData(movieName, openDate);

            if (json.Data && json.Data[0] && json.Data[0].Result && json.Data[0].Result[0] ) {
                const movieTitle = transformTitle(movieName);
                const resultTitle = transformTitle(json.Data[0].Result[0].title);

                if (movieTitle === resultTitle){
                    setPoster(json.Data[0].Result[0].posters);
                    setRating(json.Data[0].Result[0].rating);
                }
            }
        };
        getData();
    }, [movieName, openDate]);
    const urls = poster ? poster.split("|") : []; //poster가 존재할 경우에만 split 메서드 사용
    function formatDate(dateString) {
        const [year, month, day] = dateString.split('-');
        const formattedDate = year.slice(2) + '.' + month + '.' + day;
        return formattedDate;
    }


    return <div className={styles.movie_wrap}>
            <Link to={`${date}/${id}`}>
                <div className={styles.movie_poster}>
                <span className={styles.rank_txt}>{rank}</span>
                {rating == "전체관람가" ?
                        <span className={`${styles.ico_see} ${styles.see_all}`}></span> :
                        rating == "12세관람가" ?
                            <span className={`${styles.ico_see} ${styles.see12}`}></span> :
                            rating == "15세관람가" ?
                                <span className={`${styles.ico_see} ${styles.see15}`}></span> :
                                rating == "18세관람가(청소년관람불가)" ?
                                <span className={`${styles.ico_see} ${styles.see_adult}`}></span> : <></>
                }
                {urls.length > 0 ? <img src={urls[0]} alt={movieName}/> : <div className={styles.no_image}></div> }
                </div>
                <div className={styles.movie_info}>
                <h4>{movieName}</h4>
                <span className={styles.info_txt}>
                    개봉
                    <span className={styles.txt_num}>
                        {formatDate(openDate)}
                    </span>
                    <span className={styles.audi_acc}>
                        {audiAcc.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}명
                    </span>
                </span>
                </div>
            </Link>
        </div>
}

Movie.propTypes = {
    id: PropTypes.string.isRequired,
    rank: PropTypes.string.isRequired,
    movieName: PropTypes.string.isRequired,
    openDate : PropTypes.string.isRequired,
    audiAcc :  PropTypes.string.isRequired,
}

export default Movie
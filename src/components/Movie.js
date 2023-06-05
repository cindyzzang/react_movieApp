import PropTypes from "prop-types";
import {Link} from "react-router-dom";

function Movie({id,rank,movieName,date}) {

    return <div >
        <h3>{rank}위</h3>
        <Link to={`/${date}/${id}`}>
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
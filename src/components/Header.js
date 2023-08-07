import Login from "./Login";
import {useState} from "react";
import {Link} from "react-router-dom";

function Header() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [nickname, setNickname] = useState("");

    function handleLogin(nickname) {
        setNickname(nickname);
        setLoggedIn(true);
    }

    function handleLogout() {
        setNickname("");
        setLoggedIn(false);
    }

    return <div  className={"header"}>
        <Link to={"/"}><h1>{nickname} movie archive</h1></Link>
        {loggedIn ? (
            <div className={"setting"}>
                <form>
                    <input type={"search"} placeholder={"영화 검색"}/>
                    <button>검색</button>
                </form>
                <button onClick={handleLogout}>Logout</button>
            </div>
        ) : (
            <div className={"setting"}>
                <Login onLogin={handleLogin} />
            </div>
        )}
    </div>
}

export default Header;
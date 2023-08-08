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
        <Link to={"/"}><h1>{nickname} movie app</h1></Link>
        <div className={"setting"}>
        {loggedIn ? (
                <button onClick={handleLogout}>Logout</button>
        ) : (
                <Login onLogin={handleLogin} />
        )}
        </div>
    </div>
}

export default Header;
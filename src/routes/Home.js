import {useEffect, useState} from "react";
import "../styles/Home.css"
import Login from "../components/Login";
import {Link} from "react-router-dom";


function Home() {
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

    return <div>
        <h1>{nickname} movie archive</h1>
        {loggedIn ? (
            <div>
                <Link to={"/boxoffice"}>boxoffice</Link>
                <Link to={"#"}>검색</Link>
                <div>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>
        ) : (
            <Login onLogin={handleLogin} />
        )}
        </div>
    }

export default Home;
import {useEffect, useState} from "react";
import "../styles/Home.css"
import Login from "../components/Login";


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
                <button>boxoffice</button>
                <button>review</button>
                <button>추가하기</button>
                <ul>
                    <li>영화영화포스터포스터</li>
                </ul>
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
import {useEffect, useState} from "react";
import "../styles/Home.css"
import Login from "../components/Login";
import {Link} from "react-router-dom";
import BoxOffice from "../components/BoxOffice";


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

    return <div className={"container"}>
            <div  className={"header"}>
                <h1>{nickname} movie archive</h1>
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
            <div className={"content_box"}>
                {loggedIn? <BoxOffice/> : <p></p>}
            </div>
        </div>
    }

export default Home;
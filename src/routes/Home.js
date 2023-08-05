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

    return <div>
            <div  className={"header"}>
                <h1>{nickname} movie archive</h1>
                <div>
                    <form>
                        <input type={"search"}/>
                        <button>검색</button>
                    </form>
                {loggedIn ? (
                    <div>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <Login onLogin={handleLogin} />
                )}
                </div>
            </div>
            <div>
                {loggedIn? <BoxOffice/> : <p></p>}
            </div>
        </div>
    }

export default Home;
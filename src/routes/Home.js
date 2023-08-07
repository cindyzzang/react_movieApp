import {useEffect, useState} from "react";
import "../styles/Home.css"
import BoxOffice from "../components/BoxOffice";
import Header from "../components/Header";


function Home() {
    return <div className={"container"}>
            <div className={"content_box"}>
                <BoxOffice/>
            </div>
        </div>
    }

export default Home;
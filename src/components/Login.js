import {useState} from "react";
import PropTypes from "prop-types";

function Login({onLogin}) {
    const [name, setName] = useState("")

    function onChange(e) {
        setName(e.target.value)
    }
    function onClick(e) {
        if (name === "") {
            e.preventDefault()
            alert("닉네임을 입력하세요")
        } else {
            onLogin(name)
        }
    }

    function onEnterDown(e) {
        if (e.key === 'Enter') {
            (name === "") ? alert("닉네임을 입력하세요") : onLogin(name)
        }
    }
    return (
        <div>
            <input onChange={onChange} onKeyDown={onEnterDown} placeholder={"닉네임을 입력하세요"}/>
            <button onClick={onClick}>로그인</button>
        </div>

    )
}

Login.propTypes = {
    onLogin : PropTypes.func.isRequired,
}

export default Login

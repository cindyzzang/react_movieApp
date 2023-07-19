import {useState} from "react";

function Login({onLogin}) {
    const [name, setName] = useState("")

    function onChange(e) {
        setName(e.target.value)
    }
    function onClick(e) {
        if (name == "") {
            e.preventDefault()
            alert("닉네임을 입력하세요")
        } else {
            onLogin(name)
        }
    }


    return (
        <div>
            <input onChange={onChange} placeholder={"닉네임을 입력하세요"}/>
            <button onClick={onClick}>로그인</button>
        </div>

    )
}

export default Login

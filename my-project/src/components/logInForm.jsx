import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { logedInContext } from "../context/context";

function LoginForm() {
    const { logedIn, setlogedIn } = useContext(logedInContext);
    const [userName, setuserName] = useState("");
    const [password, setPassword] = useState("");
    const token = localStorage.getItem("accessToken");
    const [isLoad,setisLoad] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate("/");
            return;
        }
    }, []);

    const handleLogin =
        async () => {
            setisLoad(true);
            const response = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: userName,
                    password: password,
                    expiresInMins: 30,
                }),
                credentials: 'include'
            });
            setisLoad(false);

            const data = await response.json();
            localStorage.setItem("accessToken", data.accessToken);

            if (data.accessToken) {
                setlogedIn(true);
                navigate("/");
            }
        };
    return (
        <div className="flex flex-col items-center justify-center w-full">
            <div className="flex flex-col w-96">
                <label htmlFor="userName">User Name:</label>
                <input type="text" value={userName} onChange={(e) => setuserName(e.target.value)} placeholder="User Name" className="rounded p-1.5 bg-white" />
                <label htmlFor="userName">Password:</label>
                <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="rounded p-1.5 bg-white" />
                <button id="bt" className="text-white rounded bg-black mt-3.5 cursor-pointer" onClick={handleLogin}>{isLoad ? "Loading..." : "LogIn"}</button>
            </div>
        </div>
    )
}

export default LoginForm;
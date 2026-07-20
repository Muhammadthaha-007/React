import { useState } from "react";

function useLogin() {
    const [isLoad, setIsLoad] = useState(false);

    async function login(username, password) {
        setIsLoad(true);

        try{
            const response = await fetch('https://dummyjson.com/auth/login',{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
                credentials: "include",
            });
            const data = await response.json();

            return data;
        } finally{
            setIsLoad(false);
        }
    }
    return {login,isLoad};
}

export default useLogin;
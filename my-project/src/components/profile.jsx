import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { logedInContext } from "../context/context";

function Profile() {
    const { logedIn, setlogedIn } = useContext(logedInContext);
    const navigate = useNavigate();
    const [userName, setuserName] = useState("");
    const [image, setImage] = useState("");
    const [isLoad, setIsLoad] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        setIsLoad(true);
        fetch('https://dummyjson.com/auth/me', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            credentials: 'include'
        })
            .then(res => res.json())
            .then((data) => {
                setuserName(data.username)
                setImage(data.image)
                setIsLoad(false);
            })
    }, []);
    function logOut() {
        setlogedIn(false)
        localStorage.removeItem('accessToken')
        navigate("/login")
    }
    return (
        <div className="flex flex-row items-center justify-between gap-3">
            {isLoad ? (
                <div className="flex flex-col justify-center items-center bg-white rounded-full w-36">
                        <p>Loading...</p>
                </div>
            ) : (
                <div className="flex flex-row justify-around items-center gap-3 bg-white rounded-full w-36">
                    <div>
                        <img className="w-9 h-9 rounded-full object-cover" src={image} alt="Profile" />
                    </div>
                    <p className="text-black font-bold">{userName}</p>
                </div>
            )}
            <button onClick={logOut}>LogOut</button>
        </div>
    )
}

export default Profile;
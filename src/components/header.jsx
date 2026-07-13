import { useNavigate } from "react-router-dom";
import Profile from "./profile";
import { useContext } from "react";
import { logedInContext } from "../context/context";

function Header() {
    const { logedIn, setlogedIn } = useContext(logedInContext);
    return (
        <header className="flex flex-row justify-around text-center mt-0 p-4">
            <h1 className="font-extrabold text-4xl font-serif">
                Save The BookMarks
            </h1>
            {logedIn ? (
                <Profile logedIn={logedIn} setlogedIn={setlogedIn} />
            ) : ("")}
        </header>
    )
}

export default Header;
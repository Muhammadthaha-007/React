import BookmarkForm from "./bookmarkForm"
import BookmarkList from "./bookmarkList"
import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom";
import { logedInContext } from "../context/context";

function Bookmark() {
    
    const { logedIn, setlogedIn } = useContext(logedInContext);
    const [title, setTitle] = useState("")
    const [url, setUrl] = useState("")
    const [bookmarks, setBookmarks] = useState([])
    const [editingId, setEditingId] = useState(null)

    const token = localStorage.getItem("accessToken");

    const navigate = useNavigate();
    
    useEffect(() => {
        if (!token) {
            navigate("/login")
            return
        }
        setlogedIn(true);
        fetch('http://localhost:3000/bookmarks')
            .then(response => response.json())
            .then(data => setBookmarks(data));
        
    },[]);

    return (
        <main className="flex flex-col items-center justify-center w-full">
            <BookmarkForm
                title={title}
                setTitle={setTitle}
                url={url}
                setUrl={setUrl}
                bookmarks={bookmarks}
                setBookmarks={setBookmarks}
                editingId={editingId}
                setEditingId={setEditingId}
            />
            <BookmarkList
                setTitle={setTitle}
                setUrl={setUrl}
                bookmarks={bookmarks}
                setBookmarks={setBookmarks}
                setEditingId={setEditingId}
            />
        </main>
    )
}

export default Bookmark;
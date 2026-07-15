import BookmarkForm from "./bookmarkForm"
import BookmarkList from "./bookmarkList"
import { useState, useEffect, useContext } from "react"
import { data, useNavigate } from "react-router-dom";
import { logedInContext } from "../context/context";

import useBookmarkApi from "../hooks/useBookmarkApi"

function Bookmark() {
    
    const { logedIn, setlogedIn } = useContext(logedInContext);
    const [bookmarks, setBookmarks] = useState([])
    const [editingId, setEditingId] = useState(null)
    const [editingBookmark, setEditingBookmark] = useState(null)

    const token = localStorage.getItem("accessToken");

    const { getBookmarks } = useBookmarkApi();

    const navigate = useNavigate();
    
    useEffect(() => {
        if (!token) {
            navigate("/login")
            return
        }
        setlogedIn(true);
        getBookmarks().then(data => setBookmarks(data));

    },[]);

    return (
        <main className="flex flex-col items-center justify-center w-full">
            <BookmarkForm
                bookmarks={bookmarks}
                setBookmarks={setBookmarks}
                editingId={editingId}
                setEditingId={setEditingId}
                editingBookmark={editingBookmark}
                setEditingBookmark={setEditingBookmark}
            />
            <BookmarkList
                bookmarks={bookmarks}
                setBookmarks={setBookmarks}
                setEditingId={setEditingId}
                setEditingBookmark={setEditingBookmark}
            />
        </main>
    )
}

export default Bookmark;
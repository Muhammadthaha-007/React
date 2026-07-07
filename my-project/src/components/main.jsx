import BookmarkForm from "./bookmarkForm"
import BookmarkList from "./bookmarkList"
import { useState, useEffect } from "react"

function Bookmark() {
    const [title, setTitle] = useState("")
    const [url, setUrl] = useState("")
    const [bookmarks, setBookmarks] = useState([])
    const [editingId, setEditingId] = useState(null)

    useEffect(() => {
        fetch('http://localhost:3000/bookmarks')
            .then(response => response.json())
            .then(data => setBookmarks(data));
    }, [bookmarks]);


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
                title={title}
                setTitle={setTitle}
                url={url}
                setUrl={setUrl}
                bookmarks={bookmarks}
                setBookmarks={setBookmarks}
                editingId={editingId}
                setEditingId={setEditingId}
            />
        </main>
    )
}

export default Bookmark;
function BookmarkForm({title,setTitle,url,setUrl,bookmarks,setBookmarks,editingId,setEditingId}) {
    function addBookmark() {
        if (title.trim() === "" || url.trim() === "") {
            alert("Please Enter Both..!")
            return
        }

        if (editingId === null) {
            const newBookmark = {
                id: Date.now(),
                title: title,
                url: url
            }
            setBookmarks([...bookmarks, newBookmark])
        } else {
            const updateBookmarks = bookmarks.map(bookmark => {
                if (bookmark.id === editingId) {
                    return {
                        id: bookmark.id,
                        title: title,
                        url: url
                    }
                }
                return bookmark
            })
            setBookmarks(updateBookmarks)
            setEditingId(null)
        }

        setTitle("")
        setUrl("")
    }
    return (
        <div className="flex flex-col w-96">
            <label htmlFor="title">Title:</label>
            <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter the Title"
                className="rounded p-1.5 bg-white"
            />

            <label htmlFor="url">URL:</label>
            <input
                id="url"
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter the URL"
                className="rounded p-1.5 bg-white"
            />

            <button
                id="bt"
                className="text-white rounded bg-black mt-3.5 cursor-pointer"
                onClick={addBookmark}
            >
                {editingId === null ? "ADD TO BOOKMARKS" : "UPDATE BOOKMARK"}
            </button>
        </div>
    )
}

export default BookmarkForm;
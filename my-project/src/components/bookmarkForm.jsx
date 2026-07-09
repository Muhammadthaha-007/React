function BookmarkForm({ title, setTitle, url, setUrl, bookmarks, setBookmarks, editingId, setEditingId }) {
    async function addBookmark() {
        if (title.trim() === "" || url.trim() === "") {
            alert("Please Enter Both..!")
            return
        }

        if (editingId === null) {
            let response = await fetch('http://localhost:3000/bookmarks', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: title,
                    url: url
                })
            })
            if (response.ok) {
                const data = await response.json();
                setBookmarks([...bookmarks, data])
            }
        } else {
            let id = editingId;
            let response = await fetch(`http://localhost:3000/bookmarks/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: id,
                    title: title,
                    url: url
                })
            });
            if (response.ok) {
                const data = await response.json();
                setBookmarks(
                    bookmarks.map(
                        bookmark => bookmark.id === id ? data : bookmark
                    )
                )
            }
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
function BookmarkList({setTitle,setUrl,bookmarks,setBookmarks,setEditingId}) {

    function editBookmark(bookmark) {
        setTitle(bookmark.title)
        setUrl(bookmark.url)

        setEditingId(bookmark.id)
    }

    async function deleteBookmark(id) {
        let response = await fetch(`http://localhost:3000/bookmarks/${id}`, {
            method: "delete"
        })
        if (response.ok){
            setBookmarks(
                prevBookmark => prevBookmark.filter(bookmark => bookmark.id !== id)
            )
        }
    }
    return (
        <div className="relative flex flex-col justify-center items-center border-4 border-solid border-black rounded-2xl h-[50vh] w-[60%] mt-7">
            <h2 className="sticky top-0 text-gray-900 text-xl font-bold">
                Bookmarks
            </h2>
            {bookmarks.length === 0 ? (
                <center>
                    <div>
                        <p>No Bookmarks!</p>
                    </div>
                </center>
            ) : (
                <div className="flex flex-col pt-0 gap-1 h-full w-full overflow-y-auto">
                    {bookmarks.map((bookmark) => (
                        <div key={bookmark.id} className="flex flex-row gap-5 items-center justify-around border-b">
                            <button onClick={() => editBookmark(bookmark)}>Edit</button>

                            <button onClick={() => deleteBookmark(bookmark.id)}>Delete</button>

                            <p>{bookmark.title}</p>
                            <p>{bookmark.url}</p>

                            <a href={bookmark.url} target="_blank" rel="noopener noreferrer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right-icon lucide-arrow-up-right"><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg>
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default BookmarkList;
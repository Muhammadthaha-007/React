import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";


const bookmarkSchema = z.object({
    title: z.string().min(3, "title must be at least 3 charactors"),
    url: z.string().url("please enter valid url."),
})


function BookmarkForm({ bookmarks, setBookmarks, editingId, setEditingId, editingBookmark, setEditingBookmark }) {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(bookmarkSchema),
        defaultValues: {
            title: "",
            url: "",
        },
    });

    useEffect(() => {
        if (editingBookmark) {
            reset({
                title: editingBookmark.title,
                url: editingBookmark.url,
            });
        }else{
            reset({
                title: "",
                url: "",
            })
        }
    }, [editingBookmark, reset]);

    async function addBookmark(formData) {

        if (editingId === null) {
            let response = await fetch('http://localhost:3000/bookmarks', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: formData.title,
                    url: formData.url
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
                    title: formData.title,
                    url: formData.url
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
            setEditingBookmark(null)
            
        }

        reset();
    }
    return (
        <form onSubmit={handleSubmit(addBookmark)}>
            <div className="flex flex-col w-96">
                <label htmlFor="title">Title:</label>
                <input
                    id="title"
                    type="text"
                    {...register("title")}
                    placeholder="Enter the Title"
                    className="rounded p-1.5 bg-white"
                />
                {errors.title && (
                    <p className="text-red-500 text-sm">
                        {errors.title.message}
                    </p>
                )}

                <label htmlFor="url">URL:</label>
                <input
                    id="url"
                    type="text"
                    {...register("url")}
                    placeholder="Enter the URL"
                    className="rounded p-1.5 bg-white"
                />
                {errors.url && (
                    <p className="text-red-500 text-sm">
                        {errors.url.message}
                    </p>
                )}

                <button
                    id="bt"
                    type="submit"
                    className="text-white rounded bg-black mt-3.5 cursor-pointer"
                >
                    {editingId === null ? "ADD TO BOOKMARKS" : "UPDATE BOOKMARK"}
                </button>
            </div>
        </form>
    )
}

export default BookmarkForm;
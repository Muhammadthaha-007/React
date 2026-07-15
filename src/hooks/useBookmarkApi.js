import { useState } from "react";
import { data } from "react-router-dom";

function useBookmarkApi() {
    const [loading, setLoading] = useState(false);

    const base_url = "http://localhost:3000/bookmarks"

    async function getBookmarks() {
        setLoading(true);

        const response = await fetch(base_url);

        const data = await response.json();

        setLoading(false);

        return data;
    }

    async function createBookmark(formData) {
        setLoading(true);

        const response = await fetch(base_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: formData.title,
                url: formData.url
            })
        });
        const data = await response.json();

        setLoading(false);

        return data;
    }

    async function updateBookmark(formData, id) {
        setLoading(true);

        const response = await fetch(`${base_url}/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: id,
                    title: formData.title,
                    url: formData.url
                })
            }
        );
        const data = response.json();

        setLoading(false);

        return data;
    }

    async function deleteBookmark(id) {
        setLoading(true);

        const response = await fetch(
            `${base_url}/${id}`,
            {
                method: "DELETE"
            }
        );
        setLoading(false);

        return response.ok;
    }

    return{
        loading,
        getBookmarks,
        createBookmark,
        updateBookmark,
        deleteBookmark
    };
}

export default useBookmarkApi;
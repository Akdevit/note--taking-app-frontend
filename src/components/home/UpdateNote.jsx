import React, { useState, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import { token, url } from "../../constants/constants";
import { toast } from "react-toastify";

const UpdateNote = ({ setShowaddnotepopup, updatenote, updatenotedata }) => {
    const { title, content, color } = updatenotedata;

    const [noteTitle, setNoteTitle] = useState("");
    const [noteContent, setNoteContent] = useState("");
    const [notecolor, setNotecolor] = useState(color);

    useEffect(() => {
        // Initialize state with existing note data
        setNoteTitle(title || "");
        setNoteContent(content || "");
        setNotecolor(color || "#FFFFFF");
    }, [title, content, color]);

    const handleColorSelection = (color) => {
        setNotecolor(color);
    };

    const postData = {
        title: noteTitle,
        content: noteContent,
        color: notecolor,
    };

    const updateNoteApi = async () => {
        try {
            const response = await fetch(`${url}/api/notes/${updatenote}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(postData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Note updated successfully:", data);
            toast.success("Note updated successfully!");
        } catch (error) {
            console.error("Error updating note:", error);
            toast.error("Failed to update the note. Please try again.");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!noteTitle.trim() || !noteContent.trim() || !notecolor) {
            toast.error("All fields are required!");
            return;
        }

        updateNoteApi();
        setShowaddnotepopup(false);
        window.location.reload(); // Reload the page to reset auth state
        setNoteTitle("");
        setNoteContent("");
    };

    const colors = [
        "#FFC1CC", "#B3E5FC", "#DFFFE5", "#FFF9C4", "#E1BEE7", "#FFDAB9",
        "#FFABAB", "#B2DFDB", "#C8E6C9", "#FFF176", "#FFECB3", "#D1C4E9",
        "#FFCCBC", "#BBDEFB", "#F8BBD0", "#CFD8DC", "#A5D6A7", "#E6EE9C",
        "#B39DDB", "#FFCDD2", "#FF8A80", "#80D8FF", "#A7FFEB", "#CCFF90",
        "#F4FF81", "#EA80FC", "#FFD740", "#8C9EFF", "#FF80AB", "#B388FF",
    ];

    return (
        <div className="w-full h-full bg-[#0000003c] flex justify-center items-center fixed top-0 left-0 z-20">
            <div className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] bg-white rounded-md p-6 flex flex-col shadow-lg relative">
                <RxCross1
                    size={20}
                    className="absolute top-4 right-4 cursor-pointer"
                    onClick={() => setShowaddnotepopup(false)}
                />
                <h1 className="text-center text-2xl md:text-3xl font-bold mb-4">
                    Update Your Note
                </h1>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <input
                        type="text"
                        placeholder="Enter your note title"
                        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none"
                        value={noteTitle}
                        onChange={(e) => setNoteTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Enter your note"
                        className="border border-gray-300 rounded-md px-4 py-2 h-40 resize-none focus:outline-none"
                        value={noteContent}
                        onChange={(e) => setNoteContent(e.target.value)}
                    />
                    <div className="w-full p-2 flex flex-wrap gap-2 items-center">
                        {colors.map((color, index) => (
                            <span
                                key={index}
                                onClick={() => handleColorSelection(color)}
                                className={`w-[20px] h-[20px] rounded-full cursor-pointer ${notecolor === color ? "border-2 border-black" : ""
                                    }`}
                                style={{ backgroundColor: color }}
                            ></span>
                        ))}
                    </div>
                    <button
                        type="submit"
                        className="bg-black text-white px-4 py-2 rounded-md transition"
                    >
                        Update Note
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateNote;

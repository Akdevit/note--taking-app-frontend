import React, { useState } from 'react';
import { RxCross1 } from "react-icons/rx";
import { token, url } from '../../constants/constants';
import { toast } from 'react-toastify';

const AddNote = ({ setShowaddnotepopup }) => {
    const [noteTitle, setNoteTitle] = useState('');
    const [noteContent, setNoteContent] = useState('');
    const [notecolor, setNotecolor] = useState('#FFC1CC')

    const setnotecolor = (color) => {
        setNotecolor(color)
    }
    const postData = {
        "title": noteTitle,
        "content": noteContent,
        "color": notecolor
    };

    const Createnewnoteapi = async () => {
        fetch(`${url}/api/notes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(postData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log('Data successfully sent:', data);
            })
            .catch((error) => {
                console.error('Error sending data:', error);
            });
    }



    const handleSubmit = (e) => {
        e.preventDefault();
        if (noteTitle.trim() === '' || noteContent.trim() === '' || notecolor.trim() === '') {
            toast.error('All fields are required!');
            return;
        }
        Createnewnoteapi()//call
        setShowaddnotepopup(false);
        window.location.reload(); // Reload the page to reset auth state
        setNoteTitle('');
        setNoteContent('');
        toast.success('Note added successfully!');
    };

    const colors = [
        "#FFC1CC", // Light Pink
        "#B3E5FC", // Light Blue
        "#DFFFE5", // Mint Green
        "#FFF9C4", // Light Yellow
        "#E1BEE7", // Lavender
        "#FFDAB9", // Peach
        "#FFABAB", // Soft Red
        "#B2DFDB", // Teal
        "#C8E6C9", // Pale Green
        "#FFF176", // Sunflower Yellow
        "#FFECB3", // Light Amber
        "#D1C4E9", // Pale Purple
        "#FFCCBC", // Soft Orange
        "#BBDEFB", // Sky Blue
        "#F8BBD0", // Baby Pink
        "#CFD8DC", // Cool Gray
        "#A5D6A7", // Soft Green
        "#E6EE9C", // Lemon
        "#B39DDB", // Mauve
        "#FFCDD2", // Blush Pink
        "#FF8A80", // Coral Red
        "#80D8FF", // Electric Blue
        "#A7FFEB", // Aquamarine
        "#CCFF90", // Lime Green
        "#F4FF81", // Neon Yellow
        "#EA80FC", // Bright Purple
        "#FFD740", // Vibrant Amber
        "#8C9EFF", // Periwinkle
        "#FF80AB", // Hot Pink
        "#B388FF"  // Amethyst
    ];


    return (
        <div className="w-full h-full bg-[#0000003c] flex justify-center items-center fixed top-0 left-0 z-20">
            <div className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] h-auto bg-white rounded-md p-6 flex flex-col shadow-lg relative">
                <RxCross1 size={20} className="absolute top-4 right-4 cursor-pointer" onClick={() => setShowaddnotepopup(false)} />
                <h1 className="text-center text-2xl md:text-3xl font-bold mb-4">Add Your Note</h1>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <input
                        type="text"
                        placeholder="Enter your note title"
                        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none "
                        value={noteTitle}
                        onChange={(e) => setNoteTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Enter your note"
                        className="border border-gray-300 rounded-md px-4 py-2 h-40 resize-none focus:outline-none "
                        value={noteContent}
                        onChange={(e) => setNoteContent(e.target.value)}
                    />
                    <div className='w-full h-auto p-2 flex flex-wrap gap-2 items-center'>
                        {
                            colors.map((color, index) => (
                                <span key={index} onClick={() => setnotecolor(color)} className={`w-[20px] h-[20px] rounded-full cursor-pointer ${notecolor === color ? 'border-2 border-black' : ''}`} style={{ backgroundColor: color }}></span>
                            ))
                        }
                    </div>
                    <button
                        type="submit"
                        className="bg-black text-white px-4 py-2 rounded-md  transition"
                    >
                        Add Note
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddNote;
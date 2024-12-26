import React, { useEffect, useState } from 'react'
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { FaBullseye } from "react-icons/fa6";
import { token, url } from '../../constants/constants';
import Singlenoteshow from './Singlenoteshow';
import UpdateNote from './UpdateNote';
import { toast } from 'react-toastify';
const Notes = () => {
    const [notes, setNotes] = useState([])
    const [singlenoteshow, setSinglenoteshow] = useState(false)
    const [singlenotedata, setSinglenotedata] = useState()
    const [showaddnotepopup, setShowaddnotepopup] = useState(false) //update
    const [updatenote, setUpdatenote] = useState()
    const [lodder, setLodder] = useState(false)
    const [updatenotedata, setUpdatenotedata] = useState('')

    useEffect(() => {
        fetch(`${url}/api/notes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Add the Bearer token here
            },
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                setNotes(data); // Handle fetched data
            })
            .catch(error => {
                console.error('Error fetching notes:', error); // Handle errors
            });
    }, []);

    /* delted note */
    const DeleteNote = async (notesid) => {
        try {
            const response = await fetch(`${url}/api/notes/${notesid}`, {
                method: 'DELETE', // Specify the HTTP method as DELETE
                headers: {
                    'Content-Type': 'application/json', // Optional for DELETE, but useful for APIs
                    Authorization: `Bearer ${token}`, // Add the Bearer token here
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete the note');
            }

            const result = await response.json(); // Parse the response JSON
            toast.success(result.message); // Show success message: "Note removed"
            window.location.reload(); // Reload the page to reset auth state

        } catch (error) {
            console.error('Error while deleting note:', error);
            toast.error('Error while deleting the note. Please try again.');
        }
    }


    function truncateText(text, number) {
        // Split the text into an array of words
        const words = text.split(' ');
        // If there are more than 3 words, return the first 3 followed by "..."
        if (words.length > number) {
            return words.slice(0, number).join(' ') + '...';
        }
        // Otherwise, return the text as is
        return text;
    }

    //showSingleNote
    const showSingleNote = async (noteid) => {
        setSinglenoteshow(true)
        setLodder(true)
        try {
            const response = await fetch(`${url}/api/notes/${noteid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch note. Status: ${response.status}`);
            }

            const data = await response.json(); // Parse response JSON
            // console.log(data)
            setSinglenotedata(data)
            setLodder(false)

        } catch (err) {
            console.error('Error fetching note:', err);

        } finally {

        }
    }

    /* convert date and time  */
    function formatToIST(utcDateString) {
        const utcDate = new Date(utcDateString); // Create a Date object in UTC
        const offsetIST = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30 in milliseconds
        const istDate = new Date(utcDate.getTime() + offsetIST); // Convert to IST

        const day = String(istDate.getDate()).padStart(2, '0');
        const month = String(istDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = String(istDate.getFullYear()).slice(-2); // Get last two digits of the year
        const hours = istDate.getHours() % 12 || 12; // Convert 24-hour time to 12-hour format
        const minutes = String(istDate.getMinutes()).padStart(2, '0');
        const ampm = istDate.getHours() >= 12 ? 'PM' : 'AM';

        return `${day}/${month}/${year} ${hours}:${minutes}${ampm}`;
    }


    /* update note */
    const updatenotes = (id, notes) => {
        setShowaddnotepopup(true)
        setUpdatenote(id)
        setUpdatenotedata(notes)
    }
    return (
        <>

            {
                notes.length === 0 ? <>
                    <div className='w-full h-full flex justify-center items-center py-12'>
                        <h1 className='text-center text-8xl text-gray-300'>Add Your Notes</h1>
                    </div>
                </>
                    :
                    (
                        <div className='xl:w-[95%] lg:w-[95%] md:w-[95%] w-full h-auto p-2  grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 '>
                            {
                                notes.map((notes, index) => (
                                    <>
                                        <div key={index} className={`p-2 rounded-md whitespace-pre-wrap break-words flex flex-col gap-2 justify-between`} style={{ backgroundColor: notes.color }}>
                                            <div>
                                                <h1 className='text-2xl font-semibold'>{truncateText(notes.title, 5)}</h1>
                                                <p className='text-gray-800'>{truncateText(notes.content, 30)}</p>
                                            </div>
                                            <div className='flex justify-between items-center p-2'>
                                                <div className='flex gap-4'>
                                                    <FiEdit onClick={() => updatenotes(notes._id, notes)} size={15} className='cursor-pointer' title='Edit' />
                                                    <MdDelete onClick={() => DeleteNote(notes._id)} size={15} className='cursor-pointer' title='Delete' />
                                                    <FaBullseye onClick={() => showSingleNote(notes._id)} size={15} className='cursor-pointer' title='View' />
                                                </div>
                                                <p className='text-[12px]'>{formatToIST(notes.createdAt)}</p>
                                            </div>
                                        </div>
                                    </>
                                ))
                            }
                        </div>
                    )
            }
            {
                singlenoteshow && (
                    <Singlenoteshow setSinglenoteshow={setSinglenoteshow} singlenotedata={singlenotedata} lodder={lodder} />
                )
            }
            {/* update note popup */}
            {
                showaddnotepopup && (
                    <UpdateNote setShowaddnotepopup={setShowaddnotepopup} updatenote={updatenote} updatenotedata={updatenotedata} />
                )
            }
        </>
    )
}

export default Notes

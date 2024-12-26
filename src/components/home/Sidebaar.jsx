import React, { useState } from 'react'
import { FaPlus } from "react-icons/fa";
import AddNote from './AddNote';

const Sidebaar = () => {
    const [showaddnotepopup, setShowaddnotepopup] = useState(false)
    return (
        <>
            <div className='xl:w-[5%] lg:w-[5%] md:w-[5%] w-[15%] h-auto flex flex-col py-4  items-center'>
                <div className='w-[40px] h-[40px] rounded-full cursor-pointer bg-black flex justify-center items-center' onClick={() => setShowaddnotepopup(true)} title='add Notes'>
                    <FaPlus className='text-white' size={20} />
                </div>
            </div>
            {
                showaddnotepopup && (
                    <AddNote setShowaddnotepopup={setShowaddnotepopup} />
                )
            }

        </>
    )
}

export default Sidebaar

import React from 'react'
import { RiLogoutCircleLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Nav = () => {
    const navigate = useNavigate();
    const Username = localStorage.getItem("userdata");

    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove the token
        navigate("/login"); // Redirect to the login page
        window.location.reload(); // Reload the page to reset auth state
        toast.success('Logout successful!');
    };

    

    return (
        <>
            <div className='w-full h-[8vh] bg-gray-100 flex items-center justify-between px-4'>
                <h1 className='text-xl font-bold'>MemoNote</h1>

                <div className='flex gap-2 justify-center items-center'>
                    <h1>{Username || "user"}</h1>
                    <button onClick={handleLogout} className='p-4' title='logout'><RiLogoutCircleLine size={20} /></button>
                </div>
            </div>
        </>
    )
}

export default Nav

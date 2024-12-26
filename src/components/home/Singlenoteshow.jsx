import React from 'react'
import { RxCross1 } from 'react-icons/rx'

const Singlenoteshow = ({ setSinglenoteshow, singlenotedata, lodder }) => {
    return (
        <>

            <div className="w-full h-full bg-[#0000003c] flex justify-center items-center fixed top-0 left-0 z-20">
                <div className="w-[90%] h-[60vh] sm:w-[80%] md:w-[60%] lg:w-[40%]  bg-white rounded-md p-6 flex flex-col gap-4 shadow-lg relative">
                    <RxCross1 size={20} className="absolute top-4 right-4 cursor-pointer"
                        onClick={() => setSinglenoteshow(false)}
                    />
                    {
                        lodder ? <><h1 className='text-center'>please wait...</h1></> : <>
                            <h1 className='text-2xl '>{singlenotedata?.title}</h1>
                            <div className='w-full h-full b overflow-hidden overflow-y-auto'>
                                <p>{singlenotedata?.content}</p>
                            </div>
                        </>
                    }
                </div>
            </div>

        </>
    )
}

export default Singlenoteshow

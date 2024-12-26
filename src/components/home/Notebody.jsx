import React from 'react'
import Sidebaar from './Sidebaar'
import Notes from './Notes'

const Notebody = () => {
    return (
        <>
            <div className='w-full h-auto flex xl:flex-row lg:flex-row md:flex-row sm:flex-col flex-col'>
                <Sidebaar/>
                <Notes/>
            </div>
        </>
    )
}

export default Notebody

import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import path from '../../ultils/path'
import { Sidebar } from '../../components'

const Member = () => {
    const { isLoggedIn } = useSelector(state => state.auth)

    if (!isLoggedIn) return <Navigate to={`/${path.LOGIN}`} replace={true} />
    return (
        <div className='w-full h-min-screen flex items-center gap-4'>
            <div className='w-[327px] flex-none py-4 pl-4 h-full shadow-sm'>
                <Sidebar />
            </div>
            <div className='flex-auto h-full py-4 overflow-y-scroll'>
                <Outlet />
            </div>
        </div>
    )
}

export default Member
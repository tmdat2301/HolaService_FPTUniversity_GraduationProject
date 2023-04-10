import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import path from '../../ultils/path'
import { AdminSidebar } from '../../components'

const Admin = () => {
    const { isLoggedIn } = useSelector(state => state.auth)
    const { isAdmin } = useSelector(state => state.user)

    if (!isLoggedIn || !isAdmin) return <Navigate to={`/${path.LOGIN}`} replace={true} />
    return (
        <div className='w-full h-min-screen flex items-center gap-4'>
            <div className='w-[327px] flex-none py-4 pl-4 h-full shadow-sm'>
                <AdminSidebar />
            </div>
            <div className='flex-auto h-full py-4 overflow-y-scroll'>
                <Outlet />
            </div>
        </div>
    )
}

export default Admin
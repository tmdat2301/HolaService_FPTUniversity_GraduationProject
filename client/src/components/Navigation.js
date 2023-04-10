import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'
import path from '../ultils/path'
import { useSelector } from 'react-redux'


const notActive = 'hover:bg-secondary2 px-4 h-full flex items-center bg-secondary1'
const active = 'hover:bg-secondary2 px-4 h-full flex items-center  bg-secondary2'

const Navigation = ({ isAdmin }) => {

    const { categories } = useSelector(state => state.app)
    return (
        <div className={`w-full flex ${isAdmin ? 'justify-start' : 'justify-center'} items-center h-[40px] bg-secondary1 text-white`}>
            <div className='w-main flex h-full items-center text-sm font-medium'>
                <NavLink
                    to={`/`}
                    className={({ isActive }) => isActive ? active : notActive}
                >
                    Trang chủ
                </NavLink>
                {categories?.length > 0 && categories.map(item => {
                    return (
                        <div key={item.code} className='h-full flex justify-center items-center' >
                            <NavLink
                                to={item.slug}
                                className={({ isActive }) => isActive ? active : notActive}
                            >
                                {item.value}
                            </NavLink>
                        </div>
                    )
                })}
                <NavLink
                    to={`/${path.ABOUT_US}`}
                    className={({ isActive }) => isActive ? active : notActive}
                >
                    Liên hệ
                </NavLink>
            </div>
        </div>
    )
}

export default memo(Navigation)
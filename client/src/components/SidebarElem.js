import React, { memo } from 'react'
import icons from '../ultils/icons'
import { Link } from 'react-router-dom'
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";

const { GrNext } = icons

const SidebarElem = ({ title, content, isDouble, type }) => {
    const location = useLocation()
    const navigate = useNavigate()
    // console.log(location);

    const handleFilterPosts = (values, text) => {
        navigate({
            pathname: location.pathname,
            search: createSearchParams({
                [type]: values
            }).toString()
        }, { state: `${type === 'distance' ? 'khoản cách ' : type === 'price' ? 'giá ' : type === 'area' ? 'diện tích ' : ''}` + text.toLowerCase() });
    }


    return (
        <div className='p-4 rounded-md bg-white w-full'>
            <h3 className='text-lg font-semibold mb-4'>{title}</h3>
            {!isDouble && <div className='flex flex-col gap-2' >
                {content?.length > 0 && content.map(item => {
                    return (
                        <Link
                            to={`/${item.slug}`}
                            key={item.code}
                            className='flex gap-2 items-center cursor-pointer hover:text-orange-600 border-b border-gray-200 pb-1 border-dashed'
                        >
                            <GrNext size={10} color='#ccc' />
                            <p>{item.value}</p>
                        </Link>
                    )
                })}
            </div>}
            {isDouble && <div className='flex flex-wrap w-full' >
                {content?.map(el => (
                    <span
                        className='flex w-1/2 gap-2 py-2 items-center cursor-pointer hover:text-orange-600 border-b border-gray-200 pb-1 border-dashed'
                        key={el.value}
                        onClick={(e) => {
                            e.stopPropagation()
                            handleFilterPosts([`${el.min},${el.max}`], el.value)
                        }}
                    >
                        <GrNext size={10} color='#ccc' />
                        {el.value}
                    </span>
                ))}
            </div>}
        </div>
    )
}

export default memo(SidebarElem)
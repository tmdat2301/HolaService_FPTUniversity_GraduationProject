import React, { memo, useState } from 'react'
import icons from '../ultils/icons'
import { Link } from 'react-router-dom'
import { formatVietnameseToString } from '../ultils/fn'
import path from '../ultils/path'
import DOMPurify from 'dompurify';

const { GrStar, BsBookmarkStarFill } = icons

const Post = ({ images, user, title, star, description, address, id, price, area, distance, refer, foodtypes }) => {

    const handleStar = (star) => {
        let stars = []
        for (let i = 1; i <= +star; i++) stars.push(<GrStar className='star-item' size={18} color='yellow' />)
        return stars
    }
    return (
        <div className='w-full flex border-t border-orange-600 py-4 gap-4'>
            <Link
                to={`/${path.DETAIL}/${id}/${formatVietnameseToString(title)}`}
                className='w-[35%] flex-auto flex flex-wrap items-center relative cursor-pointer'
            >
                <img src={images[0]} alt="preview" className='w-full h-[257px] object-cover' />
                <span className='bg-overlay-70 text-white px-2 rounded-md absolute left-1 bottom-4'>{`${images.length} ảnh`}</span>
            </Link>
            <div className='w-3/5 flex-auto flex flex-col justify-between'>
                <div className='flex justify-between gap-4 w-full'>
                    <Link
                        to={`/${path.DETAIL}/${id}/${formatVietnameseToString(title)}`}
                        className='text-red-600 font-medium line-clamp-2 text-[18px]'
                    >
                        {handleStar(+star).length > 0 && handleStar(+star).map((star, number) => {
                            return (
                                <span key={number}>{star}</span>
                            )
                        })}
                        {title}
                    </Link>
                    <div className='w-[10%] flex justify-end'>
                        <BsBookmarkStarFill size={24} color='orange' />
                    </div>
                </div>
                <div className='mt-2 flex items-center gap-8'>
                    {price ? <span className='font-bold text-green-600  whitespace-nowrap overflow-hidden text-ellipsis'>{Number(price.toFixed(1)).toLocaleString() + ' đồng/tháng'}</span> : ''}
                    {area ? <span className='text-sm'>{area + ' m2'}</span> : ''}
                    {distance ? <span className={`${price ? 'text-sm text-blue-500' : 'font-bold text-green-600  whitespace-nowrap overflow-hidden text-ellipsis'}`}>{
                        `${distance}m tính từ ${refer}`
                    }</span> : ''}
                </div>
                {foodtypes?.value && <span className='text-orange-500 font-semibold'>{foodtypes.value}</span>}
                <span className='text-sm whitespace-nowrap overflow-hidden text-ellipsis'>{address}</span>
                <div className='text-gray-500 w-full h-[50px] text-ellipsis mt-2 overflow-hidden line-clamp-3'>
                    {description && description?.includes('[')
                        ? <ul className='list-disc pl-8'>
                            {JSON.parse(description)?.map((el, index) => (
                                <li key={index}>{el}</li>
                            ))}
                        </ul>
                        : <div
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }}
                            className='flex flex-col gap-3'
                        ></div>}
                </div>
                <div className='flex items-center mt-5 justify-between'>
                    <div className=' flex items-center'>
                        <img src="https://lnsel.com/wp-content/uploads/2018/12/anon-avatar-300x300.png" alt="avatar" className='w-[30px] h-[30px] object-cover rounded-full' />
                        <p>{user?.name}</p>
                    </div>
                    <div className='flex items-center gap-1'>
                        <a
                            className='bg-blue-700 text-white py-[5px] rounded-md px-[9px]'
                            href={`mailto:${user?.email}`}
                            target='_blank'
                        >
                            Gửi mail
                        </a>
                        <a
                            className='text-blue-700 rounded-md px-2 py-1 border border-blue-700'
                            href={`https://zalo.me/${user?.zalo}`}
                            target='_blank'
                        >
                            Nhắn zalo
                        </a>
                    </div>
                </div>
                <div>
                </div>
            </div>
        </div >
    )
}

export default memo(Post)
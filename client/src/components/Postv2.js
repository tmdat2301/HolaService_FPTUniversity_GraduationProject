import React, { memo, useState } from 'react'
import icons from '../ultils/icons'
import { Link } from 'react-router-dom'
import { formatVietnameseToString } from '../ultils/fn'
import path from '../ultils/path'


const { GrStar } = icons

const Postv2 = ({ images, title, star, address, id, price, area, distance, refer, foodtypes }) => {

    const handleStar = (star) => {
        let stars = []
        for (let i = 1; i <= +star; i++) stars.push(<GrStar className='star-item' size={18} color='yellow' />)
        return stars

    }
    return (
        <div className='w-1/4 p-2 '>
            <div className='flex-auto shadow-md rounded-md border flex flex-col bg-white gap-4'>
                <Link
                    to={`/${path.DETAIL}/${id}/${formatVietnameseToString(title)}`}
                    className='flex-auto flex flex-wrap items-center relative cursor-pointer'
                >
                    <img src={images[0]} alt="preview" className='w-full h-[257px] object-cover' />
                    <span className='bg-overlay-70 text-white px-2 rounded-md absolute left-1 bottom-4'>{`${images.length} ảnh`}</span>
                </Link>
                <div className='flex-auto p-4'>
                    <div className='flex justify-between gap-4 w-full'>
                        <Link
                            to={`/${path.DETAIL}/${id}/${formatVietnameseToString(title)}`}
                            className='text-red-600 h-[50px] font-medium line-clamp-2 text-[16px]'
                        >
                            {handleStar(+star).length > 0 && handleStar(+star).map((star, number) => {
                                return (
                                    <span key={number}>{star}</span>
                                )
                            })}
                            {title}
                        </Link>
                    </div>
                    <div className='mt-2 flex flex-col'>
                        {price ? <span className='font-bold text-green-600  whitespace-nowrap overflow-hidden text-ellipsis'>{Number(price.toFixed(1)).toLocaleString() + ' đồng/tháng'}</span> : ''}
                        {area ? <span className='text-sm'>{area + ' m2'}</span> : ''}
                        {distance ? <span className={`${price ? 'text-sm text-blue-500' : 'font-bold text-green-600  whitespace-nowrap overflow-hidden text-ellipsis'}`}>{
                            `${distance}m tính từ ${refer}`
                        }</span> : ''}
                    </div>
                    {foodtypes?.value && <span className='text-orange-500 font-semibold'>{foodtypes.value}</span>}
                    <span className='text-sm line-clamp-2 h-[40px]'>{address}</span>

                    <div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(Postv2)
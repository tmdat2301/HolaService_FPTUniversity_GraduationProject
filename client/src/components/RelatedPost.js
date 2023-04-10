import React, { useState, useEffect, memo } from 'react'
import { apiGetPostsByAdmin } from '../apis/post'
import { renderStar, formatVietnameseToString } from '../ultils/fn'
import moment from 'moment'
import 'moment/locale/vi'
import path from '../ultils/path'
import { Link } from 'react-router-dom'

const RelatedPost = ({ cate }) => {
    const [posts, setPosts] = useState(null)
    const fetchPosts = async () => {
        const response = await apiGetPostsByAdmin({ order: ['createdAt', 'DESC'], limit: 5, category: cate })
        if (response.success) setPosts(response.posts.rows)
    }
    useEffect(() => {
        fetchPosts()
    }, [cate])
    return (
        <div className='p-4 rounded-md bg-white w-full'>
            <h3 className='text-lg font-semibold mb-4'>Tin mới đăng</h3>
            <div className='flex flex-col'>
                {posts && posts?.map(el => (
                    <div
                        key={el.id}
                    >
                        <Link
                            to={`/${path.DETAIL}/${el.id}/${formatVietnameseToString(el.title)}`}
                            className='w-full flex items-center gap-2 py-2 border-b border-gray-300'
                        >
                            <img
                                src={el.images[0]}
                                alt="anh"
                                className='w-[65px] h-[65px] object-cover flex-none rounded-md'
                            />
                            <div className='w-full flex-auto flex flex-col justify-between gap-1'>
                                <h4 className='text-blue-600 font-medium text-[14px] line-clamp-2'>
                                    {el.title}
                                </h4>
                                <div className='text-xs flex items-center justify-between w-full'>
                                    {el.price ? <span className='font-bold text-green-600  whitespace-nowrap overflow-hidden text-ellipsis'>{Number(el.price.toFixed(1)).toLocaleString() + ' đồng/tháng'}</span> : ''}
                                    {el.area ? <span className='text-sm'>{el.area + ' m2'}</span> : ''}
                                    {el.distance ? <span className={`${el.price ? 'text-sm text-blue-500' : 'font-bold text-green-600  whitespace-nowrap overflow-hidden text-ellipsis'}`}>{
                                        `${el.distance}m tính từ ${el.ref}`
                                    }</span> : ''}
                                </div>
                                {el.foodtypes?.value && <span className='text-orange-500 text-xs font-semibold'>{el.foodtypes.value}</span>}
                            </div>
                        </Link>
                    </div>

                ))}
            </div>
        </div>
    )
}

export default memo(RelatedPost)
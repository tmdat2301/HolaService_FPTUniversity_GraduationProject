import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams, useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { apiGetPostsByAdmin } from '../../apis'
import { Post, Pagination, SidebarElem, Filter } from '../../components'
import moment from 'moment'
import 'moment/locale/vi'
import { prices, areas, distances } from '../../ultils/constants'


const Search = () => {
    const { category } = useParams()
    const { categories } = useSelector(state => state.app)
    const [posts, setPosts] = useState(null)
    const [sort, setSort] = useState(0)
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const location = useLocation()

    const fetchPosts = async (searchParamsObject) => {
        const response = await apiGetPostsByAdmin({ category: categories?.find(el => el.slug === category)?.code, ...searchParamsObject })
        if (response.success) setPosts(response.posts)
    }
    useEffect(() => {
        let params = []
        for (let entry of searchParams.entries()) params.push(entry);
        let searchParamsObject = {}
        params?.forEach(i => {
            if (Object.keys(searchParamsObject)?.some(item => item === i[0])) {
                searchParamsObject[i[0]] = [...searchParamsObject[i[0]], i[1]]
            } else {
                searchParamsObject = { ...searchParamsObject, [i[0]]: [i[1]] }
            }
        })
        if (sort === 0) searchParamsObject.order = ['views', 'DESC']
        if (sort === 1) searchParamsObject.order = ['createdAt', 'DESC']
        fetchPosts(searchParamsObject)
    }, [category, searchParams, sort])
    return (
        <div className='w-full flex flex-col gap-3 relative'>
            <div>
                <h1 className='text-[28px] font-bold' >{`Kết quả tìm kiếm ${location?.state}`}</h1>
            </div>
            <div className='flex items-center gap-8 justify-center py-5'>
                {categories?.map(item => (
                    <div
                        className='shadow-md rounded-bl-md text-blue-700 rounded-br-md cursor-pointer hover:text-orange-600'
                        onClick={() => navigate(`/${item.slug}`)}
                        key={item.id}
                    >
                        <img
                            src={item.image}
                            alt={item.slug}
                            className='w-[190px] h-[110px] object-cover rounded-tl-md rounded-tr-md'
                        />
                        <div className='font-medium p-2 text-center'>{item.value}</div>
                    </div>
                ))}
            </div>
            <div className='w-full'>
                <Filter />
            </div>
            <div className='flex gap-4'>
                <div className='w-[70%] flex-auto p-2 bg-white shadow-md rounded-md px-6'>
                    <div className='flex items-center justify-between my-3'>
                        <h4 className='text-xl font-semibold'>Danh sách tin đăng</h4>
                        <span>Cập nhật: <span>{moment(Date.now()).format('LT L')}</span></span>
                    </div>
                    <div className='flex items-center gap-2 my-2'>
                        <span>Sắp xếp:</span>
                        <span
                            onClick={() => setSort(0)}
                            className={`bg-gray-200 p-2 rounded-md cursor-pointer hover:underline ${sort === 0 && 'text-red-500'}`}>Xem nhiều</span>
                        <span
                            onClick={() => setSort(1)}
                            className={`bg-gray-200 p-2 rounded-md cursor-pointer hover:underline ${sort === 1 && 'text-red-500'}`}>Mới nhất</span>
                    </div>
                    <div className='items'>
                        {posts?.rows?.map(item => {
                            return (
                                <Post
                                    key={item?.id}
                                    address={item?.address}
                                    description={item?.desc}
                                    images={item?.images}
                                    star={+item?.star}
                                    title={item?.title}
                                    user={item?.user}
                                    id={item?.id}
                                    price={item?.price}
                                    area={item?.area}
                                />
                            )
                        })}
                    </div>
                </div>
                <div className='flex-auto w-[30%] flex flex-col gap-4'>
                    <SidebarElem
                        title='Danh mục'
                        content={categories}
                    />
                    <SidebarElem
                        title='Xem theo giá'
                        content={prices}
                        isDouble
                        type='price'
                    />
                    <SidebarElem
                        title='Xem theo diện tích'
                        content={areas}
                        isDouble
                        type='area'
                    />
                    <SidebarElem
                        title='Xem theo khoảng cách'
                        content={distances}
                        isDouble
                        type='distance'
                    />
                </div>
            </div>
            {posts && <div className='w-[70%]'>
                <Pagination count={posts?.count} posts={posts?.rows} />
            </div>}
        </div>
    )
}

export default Search
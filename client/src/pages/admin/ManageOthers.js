import React, { useEffect, useState } from 'react'
import { Pagination } from '../../components'
import { apiGetPostsByAdmin, apiDeletePostByAdmin, apiGetPosts, apiDeletePost } from '../../apis'
import moment from 'moment'
import { toast } from 'react-toastify'
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom'
import { CreatePost } from '../member'
import path from '../../ultils/path'

const ManageOthers = () => {
    // const [isCreate, setIsCreate] = useState(false)
    const [posts, setPosts] = useState(null)
    const [edit, setEdit] = useState(null)
    const [update, setUpdate] = useState(false)
    const [searchParams] = useSearchParams()
    const location = useLocation()
    const navigate = useNavigate()
    const fetchPosts = async (params) => {
        const response = location.pathname.includes('admin')
            ? await apiGetPostsByAdmin({ category: 'DVK', limit: process.env.REACT_APP_LIMIT_ADMIN, ...params })
            : await apiGetPosts({ category: 'DVK', limit: process.env.REACT_APP_LIMIT_ADMIN, ...params })
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
        if (!edit) fetchPosts(searchParamsObject)
    }, [edit, update, searchParams])

    const deletePost = async (pid) => {
        const response = location.pathname.includes('admin') ? await apiDeletePostByAdmin(pid) : await apiDeletePost(pid)
        if (response.success) {
            toast.success('Đã xóa')
            setUpdate(!update)
        } else toast.error('Something went wrong')
    }
    return (
        <div className='relative h-full bg-white p-4'>
            {edit && <div className='absolute top-0 bottom-0 left-0 right-0 bg-white'>
                <CreatePost
                    setEdit={setEdit}
                    updatingPost={edit}
                />
            </div>}
            <div className='flex items-center gap-8 border-b pb-4 justify-between'>
                <h3 className='font-bold text-[30px]  '>Quản lý dịch vụ khác</h3>
                <button
                    type='button'
                    onClick={() => navigate(`/${location.pathname.split('/')[1]}/${path.CREATE_POST}`, { state: { category: 'DVK' } })}
                    className='py-2 px-4 bg-green-600 rounded-md text-white font-semibold flex items-center justify-center gap-2'
                >
                    <span>Tạo mới dịch vụ khác</span>
                </button>
            </div>
            <div className='py-4'>
                <table className="table-auto w-full mt-4">
                    <thead>
                        <tr className='border-b border-t'>
                            <td className='p-2 font-bold'>STT</td>
                            <td className='p-2 font-bold'>Tựa đề</td>
                            <td className='p-2 font-bold'>Khoảng cách (m)</td>
                            <td className='p-2 font-bold'>Tính từ nơi</td>
                            <td className='p-2 font-bold'>Địa chỉ</td>
                            <td className='p-2 font-bold'>Lượt xem</td>
                            <td className='p-2 font-bold'>Người đăng</td>
                            <td className='p-2 font-bold'>Liên hệ</td>
                            <td className='p-2 font-bold'>Ngày đăng</td>
                            <td className='p-2 font-bold'>Hành động</td>
                        </tr>
                    </thead>
                    <tbody>
                        {posts?.rows?.map((item, index) => (
                            <tr
                                key={item.id}
                            >
                                <td className={`p-2 ${index % 2 === 0 ? '' : 'bg-gray-100'} m-auto`}>{index + 1}</td>
                                <td className={`p-2 ${index % 2 === 0 ? '' : 'bg-gray-100'} m-auto`}>{item?.title}</td>
                                <td className={`p-2 ${index % 2 === 0 ? '' : 'bg-gray-100'} m-auto`}>{item?.distance}</td>
                                <td className={`p-2 ${index % 2 === 0 ? '' : 'bg-gray-100'} m-auto`}>{item?.ref}</td>
                                <td className={`p-2 ${index % 2 === 0 ? '' : 'bg-gray-100'} m-auto`}>{item?.address}</td>
                                <td className={`p-2 ${index % 2 === 0 ? '' : 'bg-gray-100'} m-auto`}>{item?.views}</td>
                                <td className={`p-2 ${index % 2 === 0 ? '' : 'bg-gray-100'} m-auto`}>{item?.receiverName || item?.user?.name}</td>
                                <td className={`p-2 ${index % 2 === 0 ? '' : 'bg-gray-100'} m-auto`}>{item?.receiverPhone || item?.user?.email}</td>
                                <td className={`p-2 ${index % 2 === 0 ? '' : 'bg-gray-100'} m-auto`}>{moment(item?.createdAt).format('DD/MM/YYYY')}</td>

                                <td className={`p-2 ${index % 2 === 0 ? '' : 'bg-gray-100'} m-auto`}>
                                    <span
                                        className='p-2 cursor-pointer text-blue-500 hover:underline'
                                        onClick={() => setEdit(item)}
                                    >Sửa</span>
                                    <span
                                        className='p-2 cursor-pointer text-blue-500 hover:underline'
                                        onClick={() => deletePost(item.id)}
                                    >Xóa</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {posts && <div className=''>
                <Pagination admin count={posts?.count} posts={posts?.rows} />
            </div>}
        </div>
    )
}

export default ManageOthers
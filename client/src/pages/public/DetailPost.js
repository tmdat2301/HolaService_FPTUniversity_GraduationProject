import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { apiGetPostById } from '../../apis'
import icons from '../../ultils/icons'
import moment from 'moment'
import DOMPurify from 'dompurify';
import { SliderCustom, RelatedPost, QuestionAndAnswer, VoteAndComment, VoteOption } from '../../components'
import anonAvatar from '../../assets/anon-avatar.png'
import { useSelector } from 'react-redux'
import path from '../../ultils/path'


const { HiLocationMarker, TbReportMoney, RiCrop2Line, BsStopwatch, HiOutlineLocationMarker, MdMail, SiZalo, BsDot } = icons
const DetailPost = () => {
    const { pid } = useParams()
    const [post, setPost] = useState(null)
    const [render, setRender] = useState(false)
    const [isVote, setIsVote] = useState(false)
    const { isLoggedIn } = useSelector(state => state.auth)
    const fetchPost = async () => {
        const response = await apiGetPostById(pid)
        if (response.success) setPost(response.post)
    }
    useEffect(() => {
        fetchPost()
    }, [pid, render, isVote])
    return (
        <div className='w-full flex gap-4 relative'>
            {isVote && <div
                className='fixed top-0 left-0 right-0 bottom-0 z-50 bg-overlay-30 flex items-center justify-center'
                onClick={() => setIsVote(false)}
            >
                <VoteOption pid={pid} setIsVote={setIsVote} />
            </div>}
            <div className='w-[70%] flex-auto flex flex-col gap-6'>
                <SliderCustom images={post && post.images} />
                <div className='bg-white rounded-md shadow-md p-4'>
                    <div className='flex flex-col gap-2'>
                        <h2 className='text-xl font-bold text-red-600'>{post?.title}</h2>
                        <div className='flex items-center gap-2'>
                            <span>Chuyên mục:</span>
                            <Link
                                className='text-blue-600 underline font-medium hover:text-orange-600 cursor-pointer'
                                to={`/${post?.categoryData?.slug}`}
                            >
                                {post?.categoryData?.value}
                            </Link>
                        </div>
                        <div className='flex items-center gap-2'>
                            <HiLocationMarker color='#2563eb' />
                            <span>{post?.address}</span>
                        </div>
                        <div className='flex items-center justify-between'>
                            {post?.price && <span className='flex items-center gap-1'>
                                <TbReportMoney />
                                <span className='font-semibold text-lg text-green-600'>{`${Number(post?.price.toFixed(1)).toLocaleString()} đồng/tháng`}</span>
                            </span>}
                            {post?.area && <span className='flex items-center gap-1'>
                                <RiCrop2Line />
                                <span>{post?.area + ' m2'}</span>
                            </span>}
                            {post?.distance && <span className='flex items-center gap-1'>
                                <HiOutlineLocationMarker />
                                <span>{`Cách ${post?.distance}m từ ${post?.ref}`}</span>
                            </span>}
                            {post?.createdAt && <span className='flex items-center gap-1'>
                                <BsStopwatch />
                                <span>{moment(post?.createdAt).format('L')}</span>
                            </span>}
                        </div>
                    </div>
                    <div className='mt-8'>
                        <h3 className='font-semibold text-xl my-4'>Thông tin mô tả</h3>
                        {post?.desc && post?.desc?.includes('[')
                            ? <ul className='list-disc pl-8'>
                                {JSON.parse(post?.desc)?.map((el, index) => (
                                    <li key={index}>{el}</li>
                                ))}
                            </ul>
                            : <div
                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post?.desc) }}
                                className='flex flex-col gap-3'
                            ></div>}
                    </div>
                    <div className='mt-8'>
                        <h3 className='font-semibold text-xl my-4'>Thông tin liên hệ</h3>
                        <table className='w-full'>
                            <tbody className='w-full'>
                                <tr className='w-full'>
                                    <td className='p-2'>Liên hệ</td>
                                    <td className='p-2'>{post?.receiverName || post?.user?.name}</td>
                                </tr>
                                <tr className='w-full bg-gray-200'>
                                    <td className='p-2'>Điện thoại</td>
                                    <td className='p-2'>{post?.receiverPhone || post?.user?.phone}</td>
                                </tr>
                                <tr className='w-full'>
                                    <td className='p-2'>Email</td>
                                    <td className='p-2'>{post?.user?.email}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <VoteAndComment
                    votes={post?.votes}
                    star={post?.star}
                    setIsVote={setIsVote}
                />
                {!isLoggedIn ? <div className='shadow-md border rounded-md bg-white p-[10px]'>
                    <h3 className='font-bold text-[20px]'>Hỏi & đáp</h3>
                    <span className='py-4'>Bạn muốn bình luận cho bài đăng này? <Link to={`/${path.LOGIN}`} className='text-blue-500 hover:underline'>Đi tới đăng nhập nào</Link></span>
                </div> : <QuestionAndAnswer
                    comments={post?.comments}
                    pid={pid}
                    setRender={setRender}
                />}
            </div>
            <div className='w-[30%] flex-auto flex flex-col gap-8'>
                <div className='w-full bg-yellow-500 rounded-md flex flex-col items-center p-4 gap-4'>
                    <img src={post?.user?.image || anonAvatar} alt="avatar" className='w-16 h-16 object-contain rounded-full' />
                    <h3 className='font-medium text-xl'>{post?.user?.name}</h3>
                    <span className='flex items-center'>
                        <BsDot color='green' size={28} />
                        <span>Đang hoạt động</span>
                    </span>
                    <a
                        className='bg-[#13BB7B] py-2 flex items-center justify-center gap-2 w-full rounded-md text-white text-lg'
                        href={`mailto:${post?.user?.email}`}
                        target='_blank'
                    >
                        <MdMail />{post?.user?.email}
                    </a>
                    <a
                        className='bg-white py-2 flex items-center justify-center gap-2 w-full rounded-md font-bold text-lg'
                        href={`https://zalo.me/${post?.user?.phone}`}
                        target='_blank'
                    >
                        <SiZalo color='blue' size={35} />
                    </a>

                </div>
                <RelatedPost />
            </div>
        </div>
    )
}

export default DetailPost



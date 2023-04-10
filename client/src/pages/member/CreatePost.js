import React, { memo, useState, useEffect, useRef } from 'react'
import { InputField } from '../../components'
import { apiGetProvinces, apiGetDistrict, apiCreateNewPost, apiUpdatePost, apiUpdatePostByAdmin } from '../../apis'
import { Editor } from '@tinymce/tinymce-react';
import { useSelector, useDispatch } from 'react-redux';
import icons from '../../ultils/icons';
import { getBase64 } from '../../ultils/fn'
import actionTypes from '../../store/actions/actionTypes';
import { toast } from 'react-toastify'
import { useLocation } from 'react-router-dom';

const { AiFillCamera } = icons

const CreatePost = ({ setEdit, updatingPost, isAdmin }) => {
    const dispatch = useDispatch()
    const [cate, setCate] = useState(false)
    const [payload, setPayload] = useState({
        title: '',
        price: '',
        address: '',
        category: '',
        distance: '',
        area: '',
        desc: '',
        receiverName: '',
        receiverPhone: '',
        ref: '',
        foodType: ''
    })
    const location = useLocation()
    const editorRef = useRef(null);
    const [provinces, setProvinces] = useState(null)
    const [districts, setDistricts] = useState(null)
    const { categories, foodtypes } = useSelector(state => state.app)
    const [address, setAddress] = useState({
        province: '',
        district: ''
    })
    const [images, setImages] = useState('')
    const [rawImages, setRawImages] = useState(null)

    const fetchProvinces = async () => {
        const response = await apiGetProvinces()
        if (response.status === 200) setProvinces(response.data.results)
    }
    const fetchDistricts = async (provinceId) => {
        const response = await apiGetDistrict(provinceId)
        if (response.status === 200) setDistricts(response.data.results)
    }

    useEffect(() => {
        fetchProvinces()
    }, [])
    useEffect(() => {
        address.province && fetchDistricts(address.province)
    }, [address.province])

    useEffect(() => {
        let prov = ''
        let distr = ''
        if (address.province) prov = provinces.find(el => el.province_id === address.province)?.province_name
        if (address.district) distr = districts.find(el => el.district_id === address.district)?.district_name
        setPayload(prev => ({ ...prev, address: distr + ' ' + prov }))
    }, [address])
    useEffect(() => {
        if (updatingPost) {
            setPayload({
                title: updatingPost?.title || '',
                price: updatingPost?.price || '',
                address: updatingPost?.address || '',
                category: updatingPost?.category || '',
                distance: updatingPost?.distance || '',
                area: updatingPost?.area || '',
                desc: updatingPost?.desc || '',
                receiverName: updatingPost?.receiverName || '',
                receiverPhone: updatingPost?.receiverPhone || '',
                ref: updatingPost?.ref || '',
                foodType: updatingPost?.foodType || '',
            })
            setImages(updatingPost?.images)
        }
    }, [updatingPost])
    useEffect(() => {
        if (location.state?.category) setPayload(prev => ({ ...prev, category: location.state.category }))
    }, [location])
    const handleMutilImages = async (e) => {
        setRawImages(e.target.files)
        const images = []
        for (let file of e.target.files) {
            const base64 = await getBase64(file)
            images.push(base64)
        }
        setImages(images)
    }
    const handleSubmit = async () => {
        payload.desc = editorRef.current?.getContent()
        if (address.district || address.province)
            payload.address = districts.find(el => el.district_id === address.district)?.district_name + ', ' + provinces.find(el => el.province_id === address.province)?.province_name
        const formData = new FormData()
        for (let el of Object.entries(payload)) formData.append([el[0]], el[1])
        if (rawImages) {
            for (let image of rawImages) formData.append('images', image)
        } else {
            for (let image of images) formData.append('imageLink', image)
        }
        dispatch({ type: actionTypes.LOADING, flag: true })
        if (updatingPost) {
            if (location.pathname.includes('admin')) formData.append('isAdmin', true)
            const response = !location.pathname.includes('admin')
                ? await apiUpdatePost(updatingPost.id, formData)
                : await apiUpdatePostByAdmin(updatingPost.id, formData)
            dispatch({ type: actionTypes.LOADING, flag: false })
            if (response.success) {
                toast.success('Cập nhật bài đăng thành công~')
                setEdit(null)
            } else toast.error('Something went wrong')
        } else {
            const response = await apiCreateNewPost(formData)
            dispatch({ type: actionTypes.LOADING, flag: false })
            if (response.success) {
                toast.success('Tạo bài đăng thành công~')
                setPayload({
                    title: '',
                    price: '',
                    address: '',
                    category: '',
                    distance: '',
                    area: '',
                    desc: '',
                    receiverName: '',
                    receiverPhone: '',
                    ref: '',
                    foodType: ''
                })
                setImages(null)
            } else toast.error(response.mes)
        }
    }
    return (
        <div className='flex flex-col items-center pb-[100px] p-4 bg-white'>
            <div className='flex w-full items-center justify-between border-b border-gray-200'>
                <h3 className='font-bold text-[30px] pb-4 '>{!updatingPost ? 'Tạo mới tin đăng' : 'Chỉnh sửa tin đăng'}</h3>

            </div>
            <div className='py-8 flex flex-col gap-4 w-full'>
                <div className='flex gap-4'>
                    <InputField
                        preValue={'Tiêu đề: '}
                        value={payload.title}
                        nameKey='title'
                        setValue={setPayload}
                    />
                    {location.state?.category
                        ? <InputField
                            preValue={'Danh mục: '}
                            value={categories?.find(el => el.code === payload.category)?.value}
                            onlyRead
                        />
                        : <select
                            className='w-[30%] flex-auto outline-none bg-gray-100 rounded-l-full rounded-r-full py-4 px-8 '
                            value={payload.category}
                            onChange={e => {
                                setPayload(prev => ({ ...prev, category: e.target.value }))
                                if (e.target.value === 'TNT') setCate(true)
                                else setCate(false)
                            }}
                        >
                            <option value="">--Danh mục--</option>
                            {categories?.map(el => (
                                <option key={el.code} value={el.code}>{el.value}</option>
                            ))}
                        </select>}
                    {(location.state?.category === 'TQA' || payload.category === 'TQA') &&
                        <select
                            className='w-[30%] flex-auto bg-gray-100 rounded-l-full outline-none rounded-r-full py-4 px-8'
                            value={payload.foodType}
                            onChange={e => setPayload(prev => ({ ...prev, foodType: e.target.value }))}
                        >
                            <option value="">--Loại quán ăn--</option>
                            {foodtypes?.map(el => (
                                <option key={el.code} value={el.code}>{el.value}</option>
                            ))}
                        </select>}
                </div>
                {location.state && location.state.category && location.state.category === 'TNT' && <div className='flex gap-4'>
                    <InputField
                        preValue={'Giá thuê (vnđ): '}
                        value={payload.price}
                        nameKey='price'
                        setValue={setPayload}
                        type='number'
                    />
                    <InputField
                        preValue={'Diện tích (m2): '}
                        value={payload.area}
                        nameKey='area'
                        setValue={setPayload}
                        type='number'
                    />
                </div>}
                {updatingPost && updatingPost.category === 'TNT' && <div className='flex gap-4'>
                    <InputField
                        preValue={'Giá thuê (vnđ): '}
                        value={payload.price}
                        nameKey='price'
                        setValue={setPayload}
                        type='number'
                    />
                    <InputField
                        preValue={'Diện tích (m2): '}
                        value={payload.area}
                        nameKey='area'
                        setValue={setPayload}
                        type='number'
                    />
                </div>}
                {cate && <div className='flex gap-4'>
                    <InputField
                        preValue={'Giá thuê (vnđ): '}
                        value={payload.price}
                        nameKey='price'
                        setValue={setPayload}
                        type='number'
                    />
                    <InputField
                        preValue={'Diện tích (m2): '}
                        value={payload.area}
                        nameKey='area'
                        setValue={setPayload}
                        type='number'
                    />
                </div>}
                <div className='flex gap-4'>
                    <InputField
                        preValue={'Khoảng cách (m): '}
                        value={payload.distance}
                        nameKey='distance'
                        setValue={setPayload}
                        type='number'
                    />
                    <InputField
                        preValue={'Tính từ nơi: '}
                        value={payload.ref}
                        nameKey='ref'
                        setValue={setPayload}
                    />
                </div>
                <div className='flex gap-4'>
                    <InputField
                        preValue={'Người nhận: '}
                        value={payload.receiverName}
                        nameKey='receiverName'
                        setValue={setPayload}
                    />
                    <InputField
                        preValue={'Số điện thoại: '}
                        value={payload.receiverPhone}
                        nameKey='receiverPhone'
                        setValue={setPayload}
                    />
                </div>
                <div className='flex gap-4'>
                    <select
                        className='w-full text-gray-700 bg-gray-100 rounded-l-full rounded-r-full py-4 px-8 outline-[#d70018]'
                        value={address.province}
                        onChange={e => setAddress(prev => ({ ...prev, province: e.target.value }))}
                    >
                        <option value="">--Chọn tỉnh/thành phố--</option>
                        {provinces?.map(el => (
                            <option key={el.province_id} value={el.province_id}>{el.province_name}</option>
                        ))}
                    </select>
                    <select
                        className='w-full text-gray-700 bg-gray-100 rounded-l-full rounded-r-full py-4 px-8 outline-[#d70018]'
                        value={address.district}
                        onChange={e => setAddress(prev => ({ ...prev, district: e.target.value }))}
                    >
                        <option value="">--Chọn quận/huyện--</option>
                        {districts?.map(el => (
                            <option key={el.district_id} value={el.district_id}>{el.district_name}</option>
                        ))}
                    </select>
                </div>
                <div className=''>
                    <InputField
                        preValue={'Địa chỉ: '}
                        value={payload.address}
                        onlyRead
                    />
                </div>
                <div className='flex flex-col gap-2 py-4'>
                    <span className='font-bold'>Mô tả chi tiết:</span>
                    <Editor
                        apiKey='wmtf9tg6tu59bcfn55m6ytf62l61ckkerdn8per849gatpt4'
                        onInit={(evt, editor) => editorRef.current = editor}
                        initialValue={payload.desc}
                        init={{
                            height: 700,
                            menubar: true,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                            ],
                            toolbar: 'undo redo | blocks | ' +
                                'bold italic forecolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                    />
                </div>
                <div className='flex flex-col gap-2 py-4'>
                    <span className='font-bold'>Các hình ảnh bài đăng:</span>
                    <label className='w-full border-2 h-[200px] gap-4 flex flex-col items-center justify-center border-gray-400 border-dashed rounded-md bg-gray-100' htmlFor="images">
                        <AiFillCamera size={60} color='gray' />
                        <span className='text-gray-500 italic text-xs'>Chỉ hỗ trợ cái file ảnh có đuôi mở rộng .JPG và .PNG</span>
                        <span className='text-gray-500 italic text-xs'>Chọn tối đa 10 ảnh</span>
                    </label>
                    <div className='flex flex-wrap'>
                        {images && images?.map(el => (
                            <div key={el} className='w-1/4'>
                                <img src={el} alt="preview" className='h-[207px] object-contain' />
                            </div>
                        ))}
                    </div>
                    <input
                        type="file"
                        id="images"
                        hidden
                        multiple
                        onChange={handleMutilImages}
                    />
                </div>
                <div className='flex justify-center items-center'>
                    {updatingPost && <button
                        type='button'
                        onClick={handleSubmit}
                        className='py-2 px-4 bg-blue-600 rounded-md text-white font-semibold flex items-center justify-center gap-2'
                    >
                        <span>Xác nhận chỉnh sửa</span>
                    </button>}
                    {!updatingPost && <button
                        type='button'
                        onClick={handleSubmit}
                        className='py-2 px-4 bg-blue-600 rounded-md text-white font-semibold flex items-center justify-center gap-2'
                    >
                        <span>Tạo bài đăng</span>
                    </button>}
                </div>
            </div>
        </div>
    )
}

export default memo(CreatePost)
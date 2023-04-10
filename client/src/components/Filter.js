import React, { useState } from 'react'
import icons from '../ultils/icons'
import { useLocation, createSearchParams, useNavigate } from 'react-router-dom'
import { Modal } from './'
import { useSelector, useDispatch } from 'react-redux'
import actionTypes from '../store/actions/actionTypes'


const { FiSearch, BiSearch, BsChevronRight, HiOutlineLocationMarker, TbReportMoney, RiCrop2Line } = icons
const Filter = () => {

    const location = useLocation()
    const navigate = useNavigate()
    const { modal } = useSelector(state => state.app)
    const dispatch = useDispatch()
    // Giá trị filter
    const [search, setSearch] = useState({
        q: '',
        distance: '',
        price: '',
        area: '',
        foodtype: ''
    })
    // Hiển thị filter
    const [display, setDisplay] = useState({
        distance: '',
        price: '',
        area: '',
        q: '',
        foodtype: ''
    })
    // Reset filter khi chọn tìm tất cả
    // useEffect(() => {
    //     if (display.category === '') {
    //         setSearch({
    //             category: '',
    //             distance: '',
    //             price: '',
    //             area: ''
    //         })
    //         setDisplay({
    //             category: '',
    //             distance: '',
    //             price: '',
    //             area: ''
    //         })
    //     }

    // }, [display.category])
    const handleSearch = () => {
        navigate({
            pathname: location.pathname,
            search: createSearchParams(Object.entries(search)?.filter(el => !el[1] === false)).toString(),
        }, { state: Object.values(Object.entries(display).filter(el => !el[1] === false))?.map(el => el.join(' '))?.join(' ')?.replace('distance', 'khoảng cách')?.replace('price', 'giá')?.replace('area', 'diện tích')?.replace('category', '') });
    }
    return (
        <div className='w-full'>
            {modal && <Modal
                type={modal}
                search={search}
                setSearch={setSearch}
                setDisplay={setDisplay}
            />}
            <div className='flex p-2 justify-around gap-2 items-center bg-yellow-500 rounded-md' >
                {/* <div
                    className='flex-auto text-sm bg-white rounded-md p-2 flex items-center justify-between text-gray-500'
                    onClick={(e) => {
                        e.stopPropagation()
                        dispatch({ type: actionTypes.MODAL, modal: 'category' })
                    }}
                >
                    <span className='flex items-center gap-2'>
                        <MdOutlineHouseSiding />
                        <span>{display.category || 'Tìm tất cả'}</span>
                    </span>
                    <BsChevronRight />
                </div> */}
                {location.pathname === '/Dich-vu-khac' && <div className='flex-auto text-sm bg-white rounded-md p-2 flex items-center gap-2 text-gray-600'>
                    <BiSearch />
                    <input
                        type="text"
                        value={search.q}
                        onChange={e => {
                            setSearch(prev => ({ ...prev, q: e.target.value }))
                            setDisplay(prev => ({ ...prev, q: e.target.value }))
                        }}
                        placeholder='Tìm kiếm theo từ khóa'
                        className='outline-none w-full'
                    />
                </div>}
                {location.pathname === '/Tim-quan-an' && <div
                    className='flex-auto text-sm bg-white rounded-md p-2 flex items-center justify-between text-gray-500'
                    onClick={() => dispatch({ type: actionTypes.MODAL, modal: 'foodtypes' })}
                >
                    <span className='flex items-center gap-2'>
                        <HiOutlineLocationMarker />
                        <span>{display.foodtype || 'Loại quán ăn'}</span>
                    </span>
                    <BsChevronRight />
                </div>}
                <div
                    className='flex-auto text-sm bg-white rounded-md p-2 flex items-center justify-between text-gray-500'
                    onClick={() => dispatch({ type: actionTypes.MODAL, modal: 'distance' })}
                >
                    <span className='flex items-center gap-2'>
                        <HiOutlineLocationMarker />
                        <span>{display.distance || 'Khoảng cách'}</span>
                    </span>
                    <BsChevronRight />
                </div>

                {(location.pathname === '/Thue-nha-tro' || location.pathname === '/tim-kiem') && <>
                    <div
                        onClick={() => dispatch({ type: actionTypes.MODAL, modal: 'price' })}
                        className='flex-auto text-sm bg-white rounded-md p-2 flex items-center justify-between text-gray-500'
                    >
                        <span className='flex items-center gap-2'>
                            <TbReportMoney />
                            <span>{display.price || 'Chọn giá'}</span>
                        </span>
                        <BsChevronRight />
                    </div>
                    <div
                        onClick={() => dispatch({ type: actionTypes.MODAL, modal: 'area' })}
                        className='flex-auto text-sm bg-white rounded-md p-2 flex items-center justify-between text-gray-500'
                    >
                        <span className='flex items-center gap-2'>
                            <RiCrop2Line />
                            <span>{display.area || 'Chọn diện tích'}</span>
                        </span>
                        <BsChevronRight />
                    </div>
                </>}

                <button
                    type='button'
                    className='flex flex-none w-fit justify-center items-center gap-2 py-2 px-4 rounded-md bg-secondary1 text-white font-semibold'
                    onClick={handleSearch}
                >
                    <FiSearch />
                    Tìm kiếm
                </button>
            </div>
        </div>
    )
}

export default Filter
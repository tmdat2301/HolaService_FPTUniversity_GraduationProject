import React, { useState, useEffect, memo } from 'react'
import icons from '../ultils/icons'
import { useDispatch, useSelector } from 'react-redux'
import actionTypes from '../store/actions/actionTypes'
import { convert100toTarget } from '../ultils/fn'
import { prices, areas, distances } from '../ultils/constants'

const { GrLinkPrevious } = icons

const Modal = ({ type, search, setSearch, setDisplay }) => {
    const dispatch = useDispatch()
    const { categories, foodtypes } = useSelector(st => st.app)
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(100)
    const [content, setContent] = useState(null)
    const [chosenEl, setChosenEl] = useState(null)
    useEffect(() => {
        const activedTrackEl = document.getElementById('track-active')
        if (activedTrackEl) {
            if (end <= start) {
                activedTrackEl.style.left = `${end}%`
                activedTrackEl.style.right = `${100 - start}%`
            } else {
                activedTrackEl.style.left = `${start}%`
                activedTrackEl.style.right = `${100 - end}%`
            }
        }
    }, [start, end])
    useEffect(() => {
        if (type === 'price') setContent(prices)
        if (type === 'distance') setContent(distances)
        if (type === 'area') setContent(areas)
    }, [type])
    const convertTo100 = (value) => {
        switch (type) {
            case 'price':
                return value >= 15000000 ? 100 : Math.round(value / 150000)
            case 'distance':
                return value >= 5000 ? 100 : Math.round(value / 50)
            case 'area':
                return value >= 90 ? 100 : Math.ceil(value * 0.09) * 10

            default:
                return 0;
        }
    }
    //  useEffect(() => { 
    //     setEnd()
    //   },[type])
    const handleClickTrack = (e, value) => {
        const stackEl = document.getElementById('track')
        const stackRect = stackEl.getBoundingClientRect()
        let percent = value ? value : Math.round((e.clientX - stackRect.left) * 100 / stackRect.width, 0)
        if (Math.abs(percent - start) <= (Math.abs(percent - end))) {
            setStart(percent)
        } else {
            setEnd(percent)
        }
    }
    const formatMoney = number => Number(number.toFixed(1)).toLocaleString()
    const handleSubmit = () => {
        let limit = NaN
        const realStart = start > end ? convert100toTarget(end, type) : convert100toTarget(start, type)
        const realEnd = start > end ? convert100toTarget(start, type) : convert100toTarget(end, type)
        if (start === 100 || end === 100) limit = Math.pow(10, 12)
        const unit = type === 'price' ? 'đồng' : type === 'distance' ? 'm' : type === 'area' ? 'm2' : ''
        setDisplay(prev => ({ ...prev, [type]: start === 100 && end === 100 ? `Trên ${formatMoney(convert100toTarget(end, type))} ${unit}` : `Từ ${formatMoney(realStart)} đến ${formatMoney(realEnd)}` + ' ' + unit }))
        setSearch(prev => ({
            ...prev,
            [type]: [realStart, limit || realEnd]
        }))

        dispatch({ type: actionTypes.MODAL, modal: null })
    }
    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 bg-overlay-70 z-20 flex justify-center items-center'>
            <div className='w-[700px] h-[500px] bg-white rounded-md relative'>
                <div className='h-[45px] px-4 flex items-center border-b border-gray-200'>
                    <span className='cursor-pointer flex items-center gap-2' onClick={(e) => dispatch({ type: actionTypes.MODAL, modal: null })}>
                        <GrLinkPrevious size={24} />
                        <span className='font-bold'>{type === 'category' ? 'Tìm theo mục' : type === 'distance' ? 'Tìm theo khoảng cách' : type === 'price' ? 'Tìm theo giá' : type === 'area' ? 'Tìm theo diện tích' : ''}</span>
                    </span>
                </div>
                {type === 'foodtypes' && <div className='flex flex-col'>
                    <span className='px-4 py-2 border-b flex items-center gap-2 cursor-pointer hover:bg-gray-200'>
                        <input
                            type="radio"
                            checked={!search.foodtype ? true : false}
                            id='all'
                            value='Tìm tất cả quán ăn'
                            onChange={e => {
                                setSearch(prev => ({ ...prev, foodtype: '' }))
                                setDisplay(prev => ({ ...prev, foodtype: '' }))
                                dispatch({ type: actionTypes.MODAL, modal: null })
                            }}
                        />
                        <label htmlFor="all">Tìm tất cả</label>
                    </span>
                    {foodtypes && foodtypes?.map(el => (
                        <span key={el.id} className='px-4 py-2 border-b flex items-center gap-2 cursor-pointer hover:bg-gray-200'>
                            <input
                                type="radio"
                                checked={search.foodtype === el.code ? true : false}
                                id={el.id}
                                value={el.code}
                                onChange={e => {
                                    setSearch(prev => ({ ...prev, foodtype: e.target.value }))
                                    setDisplay(prev => ({ ...prev, foodtype: el.value }))
                                    dispatch({ type: actionTypes.MODAL, modal: null })
                                }}
                            />
                            <label htmlFor={el.id}>{el.value}</label>
                        </span>
                    ))}
                </div>}
                {type !== 'foodtypes' && <div className='flex flex-col'>
                    <div className='p-12 py-20'>
                        <div className='flex flex-col items-center justify-center relative'>
                            <div className='z-30 absolute top-[-48px] font-bold text-xl text-orange-600'>
                                {(start === 100 && end === 100)
                                    ? `Trên ${convert100toTarget(start, type)} ${type === 'price' ? 'đồng' : type === 'distance' ? 'm' : 'm2'} +`
                                    : `Từ ${start <= end
                                        ? Number(convert100toTarget(start, type).toFixed(1)).toLocaleString()
                                        : convert100toTarget(end, type)} - ${end >= start
                                            ? Number(convert100toTarget(end, type).toFixed(1)).toLocaleString()
                                            : Number(convert100toTarget(start, type).toFixed(1)).toLocaleString()} ${type === 'price' ? 'đồng' : type === 'distance' ? 'm' : 'm2'}`}
                            </div>
                            <div onClick={handleClickTrack} id='track' className='slider-track h-[5px] absolute top-0 bottom-0 w-full bg-gray-300 rounded-full'></div>
                            <div onClick={handleClickTrack} id='track-active' className='slider-track-active h-[5px] absolute top-0 bottom-0 bg-orange-600 rounded-full'></div>
                            <input
                                max='100'
                                min='0'
                                step='1'
                                type="range"
                                value={start}
                                className='w-full appearance-none pointer-events-none absolute top-0 bottom-0'
                                onChange={(e) => {
                                    setStart(+e.target.value)
                                }}

                            />
                            <input
                                max='100'
                                min='0'
                                step='1'
                                type="range"
                                value={end}
                                className='w-full appearance-none pointer-events-none absolute top-0 bottom-0'
                                onChange={(e) => {
                                    setEnd(+e.target.value)
                                }}
                            />
                            <div className='absolute z-30 top-6 left-0 right-0 flex justify-between items-center'>
                                <span
                                    className='cursor-pointer'
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleClickTrack(e, 0)
                                    }}
                                >
                                    0
                                </span>
                                <span
                                    className='mr-[-12px] cursor-pointer'
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleClickTrack(e, 100)
                                    }}
                                >
                                    {type === 'price' ? 'Trên 15 triệu' : type === 'distance' ? 'Trên 5km' : 'Trên 90m2'}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='w-full flex flex-col gap-4 p-12'>
                        <h3 className='font-bold'>Chọn theo:</h3>
                        <div className='flex gap-2 flex-wrap'>
                            {content && content?.map(el => (
                                <span
                                    key={el.value}
                                    className={`${chosenEl === el.value ? 'bg-secondary1 text-white' : 'bg-gray-200'} cursor-pointer py-2 px-4 border rounded-md`}
                                    onClick={() => {
                                        setChosenEl(el.value)
                                        setStart(convertTo100(el.min))
                                        setEnd(convertTo100(el.max))
                                    }}
                                >
                                    {el.value}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>}
                {type !== 'category' && <button
                    type='button'
                    className='w-full absolute bottom-0 bg-[#FFA500] py-2 font-medium rounded-bl-md rounded-br-md'
                    onClick={handleSubmit}
                >
                    ÁP DỤNG
                </button>}
            </div>
        </div>
    )
}

export default memo(Modal)
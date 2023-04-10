import React, { memo, useState } from 'react'
import icons from '../ultils/icons'


const { FaEdit } = icons

const InputField = ({ value, setValue, nameKey, preValue, onlyRead, type }) => {
    const [isEdit, setIsEdit] = useState(false)
    return (
        <div className='w-full bg-gray-100 rounded-l-full rounded-r-full text-gray-600 relative'>
            {!isEdit
                ? <div className='w-full bg-gray-100 rounded-l-full rounded-r-full py-4 px-8'>{preValue + value}</div>
                : <input
                    type={type || 'text'}
                    className='w-full bg-gray-100 rounded-l-full rounded-r-full py-4 px-8 outline-[#d70018]'
                    value={value}
                    onChange={e => setValue(prev => ({ ...prev, [nameKey]: e.target.value }))}
                    autoFocus={true}
                    onBlur={() => setIsEdit(false)}
                />}
            {!onlyRead && <span
                className='absolute top-0 bottom-0 right-[16px] flex items-center cursor-pointer'
                onClick={(e) => {
                    e.stopPropagation()
                    setIsEdit(true)
                }}
            >
                <FaEdit size={20} />
            </span>}
            {isEdit && <span className='absolute animate-slide-top  text-main bg-gradient-to-t from-gray-100 to-white px-4 top-[-18px] left-6 font-semibold'>
                {preValue}
            </span>}
        </div>
    )
}

export default memo(InputField)
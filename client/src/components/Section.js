import React from 'react'
import { Postv2 } from './'
import { useNavigate } from 'react-router-dom'
const Section = ({ posts, category }) => {
    const navigate = useNavigate()
    return (
        <div className='w-full flex flex-col gap-3 mt-8'>
            <h1 className='text-[28px] w-full font-bold text-center' >{`${category?.value} nổi bật khuyến nghị cho bạn`}</h1>
            <div className='flex justify-between'>
                {posts?.filter((el, index) => Array.from(Array(4).keys()).some(n => n === index))?.map(item => (
                    <Postv2
                        key={item.id}
                        address={item?.address}
                        description={item?.desc}
                        images={item?.images}
                        star={+item?.star}
                        title={item?.title}
                        user={item?.user}
                        id={item?.id}
                        price={item?.price}
                        area={item?.area}
                        distance={item?.distance}
                        refer={item?.ref}
                        foodtypes={item?.foodtypes}
                    />
                ))}
            </div>
            <button
                type='button'
                className='px-4 py-2 text-white font-bold bg-blue-500 w-fit m-auto rounded-md'
                onClick={() => navigate(`/${category?.slug}`)}
            >
                Xem thêm
            </button>
        </div>
    )
}

export default Section
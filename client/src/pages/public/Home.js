import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { apiGetHome } from '../../apis'
import { Section } from '../../components'

const Home = () => {
    const { categories } = useSelector(state => state.app)
    const [posts, setPosts] = useState(null)
    const fetchHome = async () => {
        const response = await apiGetHome()
        if (response.success) setPosts(response.data)
    }
    useEffect(() => {
        fetchHome()
    }, [])
    return (
        <div className='w-full flex flex-col gap-3'>
            {/* <img
                src="https://sikido.vn/uploads/source/thietkewebsite/conjunto-iconos-arrendamiento-estilo-plano-98396-1598.jpg"
                alt="cover"
                className='w-full h-[500px] object-cover'
            /> */}
            <Section posts={posts && posts.filter(el => el.category === 'TNT')} category={categories?.find(el => el.code === 'TNT')} />
            <Section posts={posts && posts.filter(el => el.category === 'TQA')} category={categories?.find(el => el.code === 'TQA')} />
            <Section posts={posts && posts.filter(el => el.category === 'DVK')} category={categories?.find(el => el.code === 'DVK')} />
        </div>
    )
}

export default Home
import React, { memo } from 'react'
import HashLoader from 'react-spinners/HashLoader'

const Loading = () => {
    return (
        <HashLoader
            color="white"
            speedMultiplier={1}
        />
    )
}

export default memo(Loading)
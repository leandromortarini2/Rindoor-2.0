import React from 'react'

export const Loader = () => {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-300 ">
        <div className="flex flex-row gap-2">
            <div className="w-4 h-4 rounded-full bg-gray-900 animate-bounce [animation-delay:.7s]"></div>
            <div className="w-4 h-4 rounded-full bg-gray-900 animate-bounce [animation-delay:.3s]"></div>
            <div className="w-4 h-4 rounded-full bg-gray-900 blue-700 animate-bounce [animation-delay:.7s]"></div>
        </div>
    </div>
  )
}

export default Loader;
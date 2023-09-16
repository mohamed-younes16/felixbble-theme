import React from 'react'

const loading = () => {
  return (
    <div className='dark:text-blackfrom-slate-100 z-[1000]  to-[#cac6e7]  dark:from-[#09090e] bg-fixed dark:from-[80%] dark:to-[#131120] bg-gradient-to-b  
    w-screen h-screen fixed inset-0 flex flex-col gap-4 justify-center items-center'>
      

        <div className="font-bold dark:text-primary-purple mb-9 animate-bounce text-black text-3xl">Loading your Page...  </div>

      <div className=' flex gap-1'> {[...Array(4).keys()].map((e,i)=><div key={i} style={{animationDelay:`${i*.20}s`}} className='  h-8 mx-3 rounded-full     dark:bg-violet-600  bg-black  w-8 animate-pulse'></div>)}</div> 
    </div>
  )
}

export default loading
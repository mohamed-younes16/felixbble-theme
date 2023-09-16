"use client"
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import closesvg  from "/public/close.svg"
const Modal = ({children}) => {
    
    const router = useRouter()
    const [show , setshow] = useState(true)

  return (

    
    <div>
        <Transition
        appear={true}
        show={show}
        as={Fragment }
        >
            <Dialog 
            onClose={()=>{
                setshow(false) 
                setTimeout(() => {

                router.push("/")
            }, 1000)}}
            as="div"
            className={ `relative z-20   `}

            >
                <Transition.Child
                as={Fragment}
                enter=' ease-[cubic-bezier(1,0.02,0.46,1.27)] duration-1000'
                enterFrom=' opacity-0 translate-y-20 '
                enterTo='   opacity-100  translate-y-0  z-10'
                leave=' ease-[cubic-bezier(0.93,-0.01,0.3,1.09)] duration-1000'
                leaveFrom=' translate-y-0   opacity-100 z-10'
                leaveTo=' -translate-y-20   opacity-0 -z[1]'
                > 
                    <div className='bg-black-100 bg-opacity-20   backdrop-blur-sm fixed inset-0' />

                </Transition.Child>
                
                <div className='fixed   z-50 inset-0 overflow-y-auto'>
                            <div className='flex  min-h-full w-full items-center justify-center p-4 text-center'>
                                    
                                    
                                    <Transition.Child
                                    as={Fragment}
                                    enter=' ease-[cubic-bezier(1,0.02,0.46,1.27)] duration-1000'
                                    enterFrom=' opacity-0 -translate-y-[500px] scale-90 '
                                    enterTo='   opacity-100  translate-y-0 scale-100 z-10'
                                    leave=' ease-[cubic-bezier(0.93,-0.01,0.3,1.09)] duration-1000'
                                    leaveFrom=' translate-y-0  scale-100 opacity-100 z-10'
                                    leaveTo=' translate-y-[500px]  scale-90 opacity-0 -z[1]'
                                    >

                                        <Dialog.Panel className={`
                                        
                                        
                                    from-slate-100  to-[#cac6e7]   dark:from-[#1a1b1f] bg-fixed dark:from-[40%] 
                                    dark:to-[#131120] bg-gradient-to-b 
                                                                        
                                         :bg-[#2c2f38]   bg-slate-400 rounded-2xl  dark:text-white p-4 min-h-[80dvh] max-sm:min-w-[100%]  sm:min-w-[70%] ` }>
                                        {children}
                                        

                                        </Dialog.Panel>

                                    </Transition.Child>

                                
                                        <button  className=" fixed top-6 right-6 z-50  animate-bounce shadow-lg transition hover:shadow-red-600 ">
                                            <Image src={closesvg} height={30} width={30} alt='close button'/>
                                    </button>
                            </div>

                    </div>

            </Dialog>

        </Transition>
    </div>
  )
}

export default Modal
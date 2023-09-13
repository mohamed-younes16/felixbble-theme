
import React from 'react'
import Link from "next/link"
import flexible from "@/public/logo.svg"
import Image from 'next/image'
import { NavLinks } from '@/app/constants'
import Auth from './Auth'

const   Nav = () => {
  const providers = true

  return (<>
  <nav className='fixed max-md:pt-6 border-b border-white max-md:text-3xl  bg-white bg-opacity-30 backdrop-blur-md  w-full max-md:px-8  px-16 top-0 left-0 z-40 flex justify-between  py-4'>
        
        <Link href='/' className="logo !text-gray-700">
            <Image height={30} width={90} src={flexible} alt='logo'  />
        </Link>

        <ul className="hidden xl:flex gap-4 my-2">
          {NavLinks.map(e=>(
            
            <li key={e.key} className=' ' > 
            <Link  className='text-lg overflow-hidden inline-block group h-10 hover:text-violet-500 transition  relative' href={e.href}>  {e.text} <div className="absolute h-1 -bottom-0 w-full transition-all   -left-full group-hover:left-0 bg-violet-600 "> </div> </Link> </li>
          ))}

        </ul>
        <div className="flex gap-4">
              {providers ? (<>
              <p>photo  </p>
                <Link href={"#"}>Share Work </Link>
              
              </>
              ) : (
                <>
                <Auth/>
                
                </>
              )}

        </div>
      



  </nav>
  </> )
}

export default Nav
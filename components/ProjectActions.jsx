/* eslint-disable @next/next/no-async-client-component */
"use client"

import { deleteProject, fetchToken } from '/lib/actions'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { BsPencil, BsTrashFill } from 'react-icons/bs'

const ProjectActions =  ({id}) => {
  const [deleting, setdeleting] = useState(false)

  const router = useRouter()


  const handleDeleteProject =  async()=>{
    setdeleting(true)
    const {csrfToken : token}  = await fetchToken()
  try {
    const res = await deleteProject(id , token)
    
    setTimeout(() => {
        router.push("/")
    router.refresh()
    }, 500);
    
  } catch (error) {
    console.log(error)
  }
  
  }
  
  return (
    <div className=' w-20 flex justify-end max-md:self-center'>
      
    <Link
    href={`/edit-project/${id}`}
     className=' block'
    > 
    <BsPencil className=' text-xl h-9 w-9 p-2  block text-white rounded-md bg-primary-purple hover:text-black hover:bg-cyan-400 transition'/>
    
    </Link>
    <button onClick={handleDeleteProject} > 
      <BsTrashFill className={`text-xl h-9 w-9 p-2  block text-white rounded-md ml-3 ${deleting ? "!bg-gray":""} hover:text-black bg-red-500 transition `}/>
    </button>

    </div>
  )
}

export default ProjectActions
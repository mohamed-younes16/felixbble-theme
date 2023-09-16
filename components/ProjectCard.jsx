"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { BsEye } from 'react-icons/bs'

const ProjectCard = ({node,det=true,thumb,prid}) => {
   

    const [randomLikes, setRandomLikes] = useState(0);
    const [randomViews, setRandomViews] = useState('');

    useEffect(() => {
        setRandomLikes(Math.floor(Math.random() * 10000))
        setRandomViews(String((Math.floor(Math.random() * 10000) / 1000).toFixed(1) + 'k'))
    }, []);
  return (
    <>
           <div className="flexCenter transition hover:translate-x-2 dark:bg-[#37353a] bg-slate-300 p-3 flex-col rounded-2xl drop-shadow-card">
            <Link href={`/project/${ prid  ||node?.id  }`} className="flexCenter h-56  w-full group relative ">
                <Image
                    src={node.image ||thumb}
                    fill
                    className="w-full  rounded-xl  object-cover  overflow-hidden"
                    alt="project image"
                />

                <div className="opacity-0 group-hover:opacity-100 transition profile_card-title">
                    <p className="w-full">{node.title}</p>
                </div>
            </Link>

            <div className="flexBetween w-full px-2 mt-3 font-semibold text-sm">
                {det && <Link href={`/profile/${node?.createdBy?.id}`}>
                        <div className="flexCenter gap-2">
                            <Image
                                src={node.createdBy?.avatarUrl}
                                width={40}
                                height={40}
                                className="rounded-full"
                                alt="profile image"
                            />
                            <p>{node.name}</p>
                        </div>               
                </Link>}
                

                <div className="flexCenter gap-3">
                    <div onClick={()=>setRandomLikes(s=>s+1)} className="flexCenter select-none group/heart cursor-pointer transition hover:text-red-700 gap-2">
                    <svg width="18" height="18" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path className=' dark:fill-white fill-black transition group-hover/heart:fill-red-700' d="M6.26333 11.9402L6.25867 11.9382L6.244 11.9302C6.15819 11.883 6.07307 11.8345 5.98867 11.7849C4.97387 11.1819 4.02552 10.4735 3.15933 9.67153C1.62533 8.2402 0 6.1162 0 3.5002C0 1.5482 1.64267 0.000199889 3.62533 0.000199889C4.1765 -0.00249973 4.72119 0.119094 5.21888 0.355937C5.71657 0.59278 6.15447 0.938779 6.5 1.3682C6.8456 0.93869 7.2836 0.592638 7.78142 0.355792C8.27924 0.118945 8.82405 -0.00260011 9.37533 0.000199889C11.3573 0.000199889 13 1.5482 13 3.5002C13 6.11687 11.3747 8.24087 9.84067 9.67087C8.9745 10.4728 8.02614 11.1812 7.01133 11.7842C6.92693 11.8341 6.84181 11.8828 6.756 11.9302L6.74133 11.9382L6.73667 11.9409L6.73467 11.9415C6.66237 11.9798 6.58181 11.9998 6.5 11.9998C6.41819 11.9998 6.33763 11.9798 6.26533 11.9415L6.26333 11.9402Z" fill="#D9D9D9"/>
                    </svg>


                        <p className="text-lg">{randomLikes}</p>
                    </div>
                    <div className=" hover:text-cyan-500 select-none transition flexCenter gap-2">
                        <BsEye className=' text-xl'/>
                        <p className="text-lg">{randomViews}</p>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default ProjectCard
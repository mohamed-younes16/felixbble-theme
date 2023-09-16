"use client"

import {  useRouter } from 'next/navigation'
import React from 'react'

export const Pagination = ({info}) => {
    const router = useRouter();

    const handleNavigation = (type) => {
        const currentParams = new URLSearchParams(window.location.search);
        
        if (type === "prev" && info.hasPreviousPage) {
            currentParams.delete("endCursor");
            currentParams.set("startCursor", info.startCursor);
        } else if (type === "next" && info.hasNextPage) {

            currentParams.delete("startCursor");
            currentParams.set("endCursor", info.endCursor);
         
        }
    
        const newSearchParams = currentParams.toString();
        const newPathname = `${window.location.pathname}?${newSearchParams}`;
    
        router.push(newPathname);
    };

    return (
        <div className="w-full flexCenter gap-5 mt-10">
            {info.hasPreviousPage && (
                <button title="First Page" onClick={() => handleNavigation('prev')} > pre</button>
            )}
            {info.hasNextPage && (
                <button title="Next Shots" onClick={() => handleNavigation('next')} > ne</button>
            )}
        </div>
    );
}
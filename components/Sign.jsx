import { Menu, Transition } from '@headlessui/react'

import React, { Fragment } from 'react'

const Sign = ({children}) => {
  return (
    <Menu as="div">
    <Menu.Button className="flexCenter text-2xl dark:bg-violet-500  border-black border-2 dark:border-white dark:text-black p-2 rounded-full"  >
        Sign In
    </Menu.Button>

    <Transition
        
        as={Fragment}
        enter="transition origin-center ease-out duration-500"
        enterFrom="transform -rotate-y-90 translate-x-40 opacity-0 scale-95"
        enterTo="transform  rotate-y-0 translate-x-0  opacity-100 scale-100"
        leave="transition origin-center ease-in duration-500"
        leaveFrom="transform  rotate-y-0  translate-x-0 opacity-100 scale-100"
        leaveTo="transform rotate-y-90 -translate-x-40  opacity-0 scale-95"
    >
        <Menu.Items
            static
            className="flexStart gap-5 bg-slate-200 max-sm:right-0 top-[4rem] dark:bg-[#232225]  fixed  right-10 profile_menu-items"
            
        >
       
          {children}
          
        </Menu.Items>
    </Transition>
</Menu>
  )
}

export default Sign
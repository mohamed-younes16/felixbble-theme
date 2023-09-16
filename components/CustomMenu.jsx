"use client"
import { Menu, Transition } from '@headlessui/react'
import Image from 'next/image'

const CustomMenu = ({filters , state,setstate}) => {

  return (
    <Menu as={'div'}>
    <Menu.Button className={`dark:bg-slate-700  flexCenter gap-4 custom_menu-btn `}>
        {state || "select a category"}
        <Image src="/arrow-down.svg" height={10} width={10} alt='arrow' />
        
        </Menu.Button>

        <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
        >
        <Menu.Items  className={ `dark:bg-slate-700 custom_menu-items `} >

        
        {filters.map((tag) => (
                        <Menu.Item key={tag}>
                            <button
                                type="button"
                                value={tag}
                                className="custom_menu-item"
                                onClick={(e) => setstate(e.currentTarget.value)}
                            >
                                {tag}
                            </button>
                        </Menu.Item>
                    ))}
      

        </Menu.Items>
    </Transition>
    </Menu>
)
}

export default CustomMenu
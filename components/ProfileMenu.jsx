"use client"
import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";


const ProfileMenu = ({ session  ,children}) => {


    return (
        <div className="flexCenter   gap-6 relative">
        <Link href={"/create-project"} className=" max-[500px]:hidden dark:bg-whiite dark:text-primary-purple 
        hover:scale-95 transition active:scale-90 font-semibold dark:bg-white rounded-full 
        text-lg p-2 border-2 border-primary-purple"> Share Work</Link>
            <Menu as="div">
                <Menu.Button className="flexCenter"  >
                    {session?.user?.image && (
                        <Image
                            src={session?.user?.image}
                            width={55}
                            height={55}
                            className="rounded-full"
                            alt="user profile image"
                        />
                    )}
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
                        className="flexStart bg-slate-200 max-sm:right-0 top-[6.2rem] dark:bg-[#232225]  fixed  right-10 profile_menu-items"
                        
                    >
                        <div className="flex flex-col items-center gap-y-4">
                            {session?.user?.image && (
                                <Image
                                    src={session?.user?.image}
                                    className="rounded-full"
                                    width={80}
                                    height={80}
                                    alt="profile Image"
                                />
                            )}
                            <p className=" origin-center text-2xl font-semibold">{session?.user?.name}</p>
                        </div>

                        <div className="flex flex-col gap-3 pt-10 items-start w-full">
                        <Link href={"/create-project"} className="self-center min-[500px]:hidden dark:bg-whiite dark:text-primary-purple 
                            hover:scale-95 transition active:scale-50 font-semibold dark:bg-white rounded-full 
                            text-lg p-2 border-2 border-primary-purple"> Share Work</Link>
                            <Menu.Item>
                                <Link href={`/profile/${session?.user?.id}`} className="text-lg  transition hover:text-primary-purple">Work Preferences</Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link href={`/profile/${session?.user?.id}`} className="text-lg transition hover:text-primary-purple">Settings</Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link href={`/profile/${session?.user?.id}`} className="transition hover:text-primary-purple text-lg">Profile</Link>
                            </Menu.Item>
                        </div>
                        <div className="w-full flexStart border-t border-nav-border mt-5 pt-5">
                            <Menu.Item>
                                <button type="button" className="text-lg transition hover:text-primary-purple" onClick={() => signOut()}> 
                                    Sign out
                                </button>
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}

export default ProfileMenu
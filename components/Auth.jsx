"use client"
import {getProviders , signIn} from "next-auth/react"
import { useState , useEffect } from "react"
import Sign from "./Sign"

const Auth = () => {
   const [providrers, setprovidrers] = useState(null)
  
   useEffect(() => {
  ( async () => {
    const res  = await getProviders()
    setprovidrers(res)
      })()
  }, [])
  

  return (
    <>

    <div className="sm:flex hidden dark:text-white">
          {providrers && <>
      {Object.values(providrers).map((e,i) =>

        <button onClick={()=> signIn(e.id)} className=" text-lg p-2 borde  dark:border-white hover:text-white hover:bg-black transition border-black-100 rounded-full mx-3 " key={i} >sign in by  {e.name}</button>
      )}
      
      </>}
    </div>

    <div className="sm:hidden flex dark:text-white">

      <Sign>
      {providrers && <>
      {Object.values(providrers).map((e,i) =>

        <button onClick={()=> signIn(e.id)} className=" text-lg p-2 border dark:border-white hover:text-white hover:bg-black transition border-black-100 rounded-full mx-3 " key={i} >sign in by  {e.name}</button>
      )}
      
      </>}
      </Sign>
    </div>
  
    </>
  )
}

export default Auth

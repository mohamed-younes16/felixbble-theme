"use server"

import { createProject, fetchToken, updateProject } from "/lib/actions"

export const handleForm = async (e,id)=>{
    
    
    const data = {}
    e.forEach((val , key) => {
        data[key] = val
    })
    const {csrfToken : token}  = await fetchToken()
    
   try {
    await createProject(data,id,token)
    return true 
   } catch (error) {
    return false
   }  
   
        

}


export const handleFormUpdate = async (e,id)=>{

    function isBase64DataURL(value) {
        const base64Regex = /^data:image\/[a-z]+;base64,/;
        return base64Regex.test(value);
    }
    
    const data = {}
    e.forEach((val , key) => {

            if (!isBase64DataURL(val) && key === "image" ) return
                else {
                    return data[key] = val
                }
            
        
        
    })
    
    const {csrfToken : token}  = await fetchToken()
    try {
        await updateProject(data,id,token)
        return true 
       } catch (error) {
        console.log(error)
        return false
       }  

}


"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import FormField from './FormField'
import CustomMenu from './CustomMenu'
import { categoryFilters } from '/app/constants'
import { handleForm, handleFormUpdate } from '/action/index'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'



const ProjectForm = ({type,session,pr , id}) => {
   
    const [sub ,setsub] = useState(false)
    const [valid ,setvalid] = useState(false)
    const router = useRouter()
    const [form, setForm] = useState({
        title:pr?.title ||  "",
        description: pr?.description || "",
        image: pr?.image || "",
        liveSiteUrl:pr?.liveSiteUrl || "",
        githubUrl: pr?.githubUrl || "",
        category: pr?.category || ""
    })
        const handlesetting = (type,val) =>{
            setForm(s=>({...s , [type]:val}))
        }
    const handleimage = (e)=>{
        e.preventDefault()
        const file  = e.target.files[0]
      
        if (!file.type.includes('image')) {
            alert("put an image please! ")
        }
        const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload=()=>{
                handlesetting('image' , reader.result) 
            }

    }
    useEffect(() => {
        
       
        const isValid1 =  (/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g.test(form.githubUrl));
        const isValid2 =  (/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g.test(form.liveSiteUrl));
        
        isValid2 && isValid1 ?   setvalid(isValid2 && isValid1):""
    }, [form.liveSiteUrl, form.githubUrl]);
    
    
return (

    <form  onSubmit={()=> {setsub(true);toast.loading("trying to upload your project",{duration:1000})}} action={async (e)=> {
        
    e.append("category",form.category);
    e.set("image",form.image);

        if(type !== "edit" ) {
        const change = await  handleForm(e,session?.user?.id)

                if (change) {

                    setTimeout(() => {
                setsub(!change)
             
                if (change == true) {
                    toast.success("upload success")
                }
                else {
                    toast.error("failed")
                    }
                    setTimeout(() => {
                        router.push("/")
                        router.refresh()
                    }, 200);  
                    }, 300); 
                }
                else {
                    toast.error("check all inputs are filled  or lower the image size")
                }
        }
        else {
            const change = await  handleFormUpdate(e,id)
            if (change) {

                setTimeout(() => {
            setsub(!change)
           
            if (change == true) {
                toast.success("update success")
            }
            else {
                toast.error("failed to update")
                }
                setTimeout(() => {
                    router.push("/")
                    router.refresh()
                }, 200);  
                }, 300); 
            }
            else {
                toast.error("check all inputs are valid or lower the image size")
            }
        }
            
    
        
    }} className="form flex flex-col  !max-w-[45rem]">

            <div className=" items-center  gap-4 max-md:flex-col relative flex max-w-7xl p-3 self-center">
                    <input type="file"  name="image" id='poster'  className="h-0 w-0 left-0" onChange={handleimage} required={type == "create" ? true : false} accept='image/*' />
                    <label htmlFor="poster" className=' flexCenter max-sm:w-80 h-40 w-96 hover:border-white hover:text-primary-purple border-8 border-dashed text-2xl hover:scale-95 active:scale-90 transition-all   cursor-pointer border-violet-700 rounded-md'>
                        {!form.image ? "Upload new Image" :" update Image"}
                    </label>
                    <div className="relative dark:bg-slate-400 bg-black max-md:w-full h-[200px] flexCenter md:max-w-[200px]">   
                    {form.image && <Image src={ form.image} alt='image ' 
                    width={150} height={150}  className=' z-20 object-contain'/>} </div>


            </div>
            <FormField
            name={"description"}
            title="description"
            state={form.description}
            placeholder= {"description"}
            setstate={(v)=>handlesetting("description",v)}
            isTextArea
            />

            <FormField
             name={"title"}
            title="title"
            state={form.title}
            placeholder= {"title...."}
            setstate={(v)=>handlesetting("title",v)}
            />

              <FormField
               name={"liveSiteUrl"}
            title="liveSiteUrl"
            state={form.liveSiteUrl}
            placeholder= {"https:protfolio.com...."}
            setstate={(v)=>handlesetting("liveSiteUrl",v)}
            />

              <FormField
               name={"githubUrl"}
            title="githubUrl"
            state={form.githubUrl}
            placeholder= {"githubUrl...."}
            setstate={(v)=>handlesetting("githubUrl",v)}
            />

            <CustomMenu
             name={"category"}
            title="category"
            state={form.category}
            filters={categoryFilters}
            setstate={(v)=>handlesetting("category",v)}
            />
            
            <button type="submit" disabled={sub || !valid } className={`${sub || !valid ? "!bg-gray border-0 !text-opacity-300 " : ""}  transition-all self-center  z-50 text-2xl dark:bg-white
            dark:text-primary-purple  flexCenter gap-2
            border-2 p-2 rounded-xl border-primary-purple`} >
             {sub && <span className= 'h-10 rounded-full w-10 animate-spin border-dotted border-4 border-l-0  rounde-full '> </span>} {sub ? "submitting" : "submit"}  </button>
    </form>
)
}

export default ProjectForm
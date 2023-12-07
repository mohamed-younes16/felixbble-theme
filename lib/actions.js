import { createProjectMutation, createUserQuery, deleteProjectMutation, getProjectByIdQuery, getProjectsOfUserQuery, getuserQuery, projectsQuery, updateProjectMutation } from "/graphql";

import { GraphQLClient } from "graphql-request";


const isProduction = process.env.NODE_ENV === "production"

const apiUrl = isProduction ?process.env.NEXT_PUBLIC_GRAPHBASE_URL || "": "http://127.0.0.1:4000/graphql" 

const apiKey = isProduction ? process.env.NEXT_PUBLIC_GRAPHBASE_KEY ||""  :  "1234"

const serverUrl = isProduction ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` :  "http://localhost:3000"

const client = new GraphQLClient(apiUrl)

const doRequest = async (query , vars = {})=>{
    try {
        return await client.request(query, vars)
    } catch (error) {
        console.log(error)
    }

}

export const getUser = async (email )=>{
    client.setHeader("x-api-key", apiKey)
return  doRequest(getuserQuery , {email})
}
export const createUser = async (name, email,avatarUrl )=>{
    client.setHeader("x-api-key", apiKey)
 

    return  doRequest(createUserQuery , {input: {
        name, email,avatarUrl
}})}


export const uploadImage = async (path)=>{
    
        try {
            const res = await fetch(`${serverUrl}/api/upload`,{
                method: "POST",
                body:JSON.stringify({path})
            })
           return res.json()

        } catch (error) {
            throw error
        }
    }

  
    

    export const fetchToken = async () => {
        try {
        const response = await fetch(`${serverUrl}/api/auth/csrf`);
        return response.json();
        } catch (err) {
        throw err;
        }
      };



export const createProject = async (data , id , token)=>{

console.log(data)

    client.setHeader("Authorization", `Bearer ${token}` )
    
    client.setHeader("x-api-key", apiKey)
    console.log("uploadiiiiing")
    return doRequest(createProjectMutation ,{input:{
            ...data,
            createdBy: {
                link:id
            }
        } } )

}



export const fetchProjects = async (category , endCursor ) =>{

  
    client.setHeader("x-api-key", apiKey)
    const res = doRequest(projectsQuery ,{ category , endCursor})
   
    return res

}


export const getProjectDetails = async (id)=>{

    client.setHeader("x-api-key", apiKey)
    return  doRequest(getProjectByIdQuery , {id})
}


export const getProjectOfUser = async (id,last)=>{

    client.setHeader("x-api-key", apiKey)
    return  doRequest(getProjectsOfUserQuery , {id , last})
}


export const deleteProject = async (id , token)=>{
    client.setHeader("Authorization", `Bearer ${token}` )
    client.setHeader("x-api-key", apiKey)
    return  doRequest(deleteProjectMutation , {id})
}



export const updateProject = async (data ,id , token)=>{
let updatedForm = {...data}
 

            
            if (data.image) {
                const imageUrl = await uploadImage(data.image);
            
                if (imageUrl.url) {
                  updatedForm = { ...updatedForm, image: imageUrl.url };
                }
              }



            client.setHeader("Authorization", `Bearer ${token}` )
            
            client.setHeader("x-api-key", apiKey)
           console.log(updatedForm)
            return doRequest(updateProjectMutation ,{
                id,
                input:updatedForm
            })
        
        

}




import ProjectCard from "@/components/ProjectCard"
import Categories from "/components/Categories"

import { fetchProjects } from "/lib/actions"


export default async function Home({searchParams:{categorie,endCursor}}) {
  
  const data = await fetchProjects(categorie || "Frontend",endCursor)

  const projectsData = data?.projectSearch?.edges
  

  


  return (
    <>
    <Categories/>
    <div className=" projects-grid"> 
    {projectsData.map(({node}) =>(
      <ProjectCard key={node.id} node={node}/>
    ) )}
    </div>
    

  

        </>
    
  )
}

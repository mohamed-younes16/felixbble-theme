import { getCurrentUser } from '/app/api/auth/[...nextauth]/route'
import Modal from '/components/Modal'
import ProjectActions from '/components/ProjectActions'
import ProjectCard from '/components/ProjectCard'
import { getProjectDetails, getProjectOfUser } from '/lib/actions'
import Image from 'next/image'
import Link from 'next/link'
import { BsGithub , BsRocketFill } from 'react-icons/bs'

const Project = async ({params}) => {
    
    const session = await getCurrentUser()
    
    const res = await getProjectDetails(params.id)
    console.log(res,"__________")
    const {title , id ,description ,image , liveSiteUrl , githubUrl,createdBy,category} = res?.project
   
    const userProject = await getProjectOfUser(createdBy.id)

    if(!res) {
        return <p>Unfortunately we didn&lsquo;t find the projec :( </p>
    }
        const isAdmin = createdBy.id === session?.user?.id && createdBy?.email === session?.user?.email  






  return (

 
        <Modal>
                <div className="xl:p-10 ">
                    <div className="flex justify-between gap-4 flew-wrap  max-md:flex-col max-md:items-start items-center max-md:justify-center">
                        <div className="flex items-center  gap-4">
                            <Link href={`/profile/${createdBy?.id}`}>
                             <Image src={createdBy.avatarUrl} height={70} width={70} alt='creator logo' className=' hover:rotate-[360deg] hover:scale-105 transition duration-300  object-cover rounded-full' />
                            </Link>
                            
                        <div className=' text-left rtl:text-right ' >
                            <h2  style={{wordBreak:"break-word"}} className="font-bold text-2xl   ">{title}</h2>
                            <div className="mt-4 text-lg whitespace-nowrap">{createdBy.name} | {category}  </div>

                        </div>
                        </div>

                            {isAdmin && <ProjectActions id={id}/>}
                            </div>
                        <div className="mt-10 rounded-2xl relative 450 340 max-md:w-[450px] max-md:h-[300px] overflow-hidden h-[415px] xl:h-[660px] xl:w-[900px] w-[688px] mx-auto max-[553px]:w-[340px] max-[553px]:h-[200px]  ">
                                <Image fill src={image} alt='picture of the project you searched for ' className='object-cover' />
                        </div>
                        <div className="mt-16 gap-8 flexCenter flex-col">
                            <div className="text-3xl font-bold">Description: </div>
                            <p className="font-semibold">
                                {description}
                                </p>
                            <div className="flex gap-16 border-t border-white pt-8">
                                <Link className='  flexCenter gap-2 hover:text-cyan-500
                                transition  text-lg ' href={githubUrl}>
                                    <span><BsGithub className=' text-4xl'/> </span> 
                                    GithubUrl  </Link>
                                <Link className=' flexCenter gap-2  hover:text-red-600 transition 
                                text-lg' href={liveSiteUrl}><span>
                                    <BsRocketFill className=' text-4xl'/> 
                                </span> LiveSiteUrl</Link>
                            </div>
                        </div>
                        <div className="w-full relative flexCenter my-20">
                        <Link href={`/profile/${createdBy?.id}`}>
                            <Image src={createdBy.avatarUrl} className=' dark:bg-[#2c2f38] hover:rotate-[360deg] hover:scale-105 transition duration-300 bg-white max-md:h-[100px] max-md:w-[100px] relative z-10 rounded-full bg-inherit p-4' height={130} width={130}  alt=' creator logo '/> 
                        </Link>
                            <div className="absolute w-full h-1 bg-white left-0 top-1/2 z-0 -translate-y-1/2"> </div>
                            
                        </div>
                        <div className="font-semibold text-lg ">also Created-by {createdBy.name}  </div>
                        <div className="projects-grid-md mt-24  "> 
                            {userProject.user.projects.edges.map(({node}) =>(
                            <ProjectCard key={node.id} node={node} det={false}/>
                            ) )}
                            </div>
                </div>
        </Modal>
    
  )
}

export default Project
import { getCurrentUser } from '/app/api/auth/[...nextauth]/route'
import Modal from '/components/Modal'
import ProjectForm from '/components/ProjectForm'
import { getProjectDetails } from '/lib/actions'

import React from 'react'


const Page = async ({params:{id}}) => {
 const session = await getCurrentUser()

const res = await  getProjectDetails(id)

  return (
    <div>
    <Modal>
                <h1 className=' text-3xl font-bold '>Edit Your Project</h1>
                <ProjectForm type={"edit"}  session={session} pr={res.project} id={id}/>
    </Modal>
        
    </div>
  )
}

export default Page
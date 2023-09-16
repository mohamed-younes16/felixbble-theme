import Modal from '/components/Modal'
import ProjectForm from '/components/ProjectForm'

import React from 'react'
import { getCurrentUser } from '../api/auth/[...nextauth]/route'

const Page = async () => {
    const session =  await getCurrentUser()
     
  return (
    <div>
    <Modal>
                <h1 className=' text-3xl font-bold '>create Your Project</h1>
                <ProjectForm type={"create"} session={session} />
    </Modal>
        
    </div>
  )
}

export default Page
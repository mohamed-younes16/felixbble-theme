import ProfilePage from '/components/ProfilePage'
import { getProjectOfUser } from '/lib/actions'


const UserProfile = async ({params:{id}}) => {
   const {user} = await getProjectOfUser(id , 100)

   if(!user || ! user.projects.edges) {
    return (<>
    <div className="flexCenter py-10 text-2xl">
        User Not Found Or No projects
    </div>
    </>)
   }
  return (
    <div > 
        <ProfilePage user={user} />
    </div>
  )
}

export default UserProfile
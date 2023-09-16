import { createUser, getUser } from '/lib/actions';
import NextAuth, { getServerSession } from 'next-auth';
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import jsonwebtoken from 'jsonwebtoken'



const authOptions = {
  jwt:{
    decode: async ({secret,token}) =>{
      const decodedToken = jsonwebtoken.verify(token, secret);
      return decodedToken ;
    },
    encode:  ({secret,token}) =>{
      const encodedToken = jsonwebtoken.sign(
        {
          ...token,
          iss: "grafbase",
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 2,
        },
        secret
      );
      
      return encodedToken;
    }
  },

  providers: [
    
    
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      
    }), GoogleProvider({
      clientId: process.env.NEXT_GOOGLE_ID,
      clientSecret: process.env.NEXT_GOOGLE_SECRET
    })
  
  ],
  callbacks:{
    async signIn({user}){
      try {
        const userExists = await getUser(user?.email )
        
        if (!userExists.user) {
          console.log("creating____________________")
          await createUser(user.name , user.email , user.image)
          console.log("done________________________________")
        }

        return true;
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false;
      }
    
    },
   async session({session}) {
    
      const email = session?.user?.email ;

      try { 
        const data = await getUser(email) 

        const newSession = {
          ...session,
          user: {
            ...session.user,
            ...data?.user,
          },
        };

        return newSession;
    }   catch (error) {
      console.error("Error retrieving user data: ", error.message);
      return session;
    }
    
   }
    
  }
  

}


const handler = NextAuth(authOptions)

export async function getCurrentUser() {
  const session = await getServerSession(authOptions)

  return session;
}

export { handler as GET, handler as POST }
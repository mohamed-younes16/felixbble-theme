import { Toaster } from 'react-hot-toast'
import Nav from '/components/Nav'
import './globals.css'
import Provider from '/components/Provider'
import FooterBanner from '/components/FooterBanner'




export const metadata = {
  title: 'Felixbble',
  description: 'Dribble theme app',
 
}

export default function RootLayout({ children }) {
  return (
    <html className=' dark' lang="en">
      <body className={`bg-gray-200`} >
        
          <Provider>
   
                <main suppressHydrationWarning={true} className=" dark:text-white
                 transition-all  dark:bg-[url(/blob.svg)] bg-fixed backdrop-blur-lg  bg-[url(/blobLight.svg)] 
                !pt-20 overflow-x-hidden main-container">
                  <Nav/>
                  
                  <Toaster position='top-center'/>
                  {children}
                  <FooterBanner />
                </main>

          </Provider>
      
        </body>
    </html>
  )
}

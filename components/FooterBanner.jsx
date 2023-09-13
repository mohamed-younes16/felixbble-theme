import { footerLinks } from "@/app/constants"
import Image from "next/image"
import Link from "next/link"


const FooterBanner = () => {

  return (
    <><div className='flex flex-col gap-10 items-start paddings'>
        
        <div>
          <Image src="/logo-purple.svg" width={150} height={60} alt="logo image"/>
          <p className=" text-lg mt-4">Felixbble is the world&lsquo;s leading community for creatives to share grow and get hired   </p>
        </div> 
        
        <div className="flex flex-wrap gap-10">
        
        {footerLinks.map(e=> (
          <div key={ e.title}>
            <h2 className="text-lg font-bold">{e.title}</h2>
            <ul className="mt-4 flex flex-col gap-4">
              {e.links.map(el =><li key={el}><Link  className='text-lg overflow-hidden inline-block group h-10 hover:text-violet-500 transition  relative' href={"#"}>  {el} <div className="absolute h-1 -bottom-0 w-full transition-all   -left-full group-hover:left-0 bg-violet-600 "> </div> </Link> </li>)}
            </ul>
          </div>
        ))}
        </div>
      
    </div>
    <div className="flexBetween !text-xl footer_copyright">

      <p>@ 2023 Felixble All  Right Reserved  </p>
      <p  className="text-gray"> <span className="texxt-black font-bold"> 30 </span> project submitted   </p>
    </div>
    
    </>
    
  )
}

export default FooterBanner
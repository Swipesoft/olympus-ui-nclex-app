"use client"; 
import {useState} from "react"; 
import DesktopNav  from "./desktopNav";
import MobileNav from "./mobileNav"; 

const Navbar = () => {
    const [showNav, setshowNav] = useState<boolean>(false); 
    const handleNavOpen = () => setshowNav(true); 
    const handleNavClose = () => setshowNav(false); 

    return (
        <>  
            <DesktopNav openNav={handleNavOpen} />
            <MobileNav showNav={showNav} closeNav={handleNavClose} />
        </>
    ) 
}; 

export default Navbar; 
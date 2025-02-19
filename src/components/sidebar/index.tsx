import * as React from 'react';
import homeIcon from "@/assets/icons/home.svg"
import settings from "@/assets/icons/settings.svg"
import direction from "@/assets/icons/direction.svg"
import add from "@/assets/icons/add.svg"
import myPhoto from "@/assets/icons/my-photo.svg"
import logout from "@/assets/icons/logout.svg"
import notification from "@/assets/icons/notification.svg"
import profile from "@/assets/icons/profile.svg"
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { buttonVariants } from '../ui/button';
import { useUserAuth } from '@/context/userAuthContext';
interface ISidebarProps {
}

const navLinks = [
    {
        name: 'Home',
        link: '/',
        icon: homeIcon
    },
    {
        name: 'Add Photos',
        link: '/post',
        icon: add
    },
    {
        name: 'My Photos',
        link: '/my-photos',
        icon: myPhoto
    },
    {
        name: 'Profile',
        link: '/profile',
        icon: profile
    },
    {
        name: 'Notifications',
        link: '#',
        icon: notification
    },
    {
        name: 'Direct',
        link: '#',
        icon: direction
    },
    {
        name: 'Settings',
        link: '#',
        icon: settings
    }
]

const Sidebar: React.FunctionComponent<ISidebarProps> = (props) => {
    const {pathname} = useLocation()
    const {logOut} = useUserAuth()

  return <nav className='flex flex-col relative h-screen max-w-sm w-full'>
    <div className='flex justify-center m-5'>
        <div className='text-lg text-white'>SnapSync</div>
        </div>
        {navLinks?.map((obj) => {
            return <div className={cn(buttonVariants({variant:"default"}),
                pathname === obj.link ? "bg-white text-white-800 hover:bg-white rounded-none" : "hover:bg-slate-950 hover:text-white bg-transparent rounded-none", "justify-start"
            )} key={obj.name} >
                <Link  to={obj.link} className='flex'>
                    <span>
                        <img src={obj.icon} alt={obj.name} className='w-5 h-5 mr-2' style={{filter: `${pathname === obj.link ? "invert(0)" : "invert(1)"}`}} />
                    </span>
                    <span>{obj.name}</span>
                </Link>
            </div>
        })}

            <div className={cn(buttonVariants({variant:"default"}),
                pathname === "/login" ? "bg-white text-white-800 hover:bg-white rounded-none" : "hover:bg-slate-950 hover:text-white bg-transparent rounded-none", "justify-start"
            )} >
                <Link  to="/login" className='flex' onClick={logOut}>
                    <span>
                        <img src={logout} alt={"logout"} className='w-5 h-5 mr-2' style={{filter: `${pathname === "/login" ? "invert(0)" : "invert(1)"}`}} />
                    </span>
                    <span>Logout</span>
                </Link>
            </div>
 
  </nav>
};

export default Sidebar;

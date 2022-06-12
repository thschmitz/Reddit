import React, { useEffect, useState } from 'react'
import Image from "next/image"
import {MenuIcon, ChevronDownIcon, HomeIcon, SearchIcon} from "@heroicons/react/solid"
import {StarIcon, BellIcon, ChatIcon, GlobeIcon, PlusIcon, SparklesIcon, SpeakerphoneIcon, VideoCameraIcon} from "@heroicons/react/outline"
import {signIn, signOut, useSession } from 'next-auth/react'
import Link from "next/link"
import {useQuery, useMutation} from "@apollo/client"
import { GET_ALL_USERS, SEARCH_USERNAME } from '../graphql/queries'
import { ADD_USER } from '../graphql/mutations'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const Header = () => {
    const {data: session} = useSession();
    const {data, loading} = useQuery(GET_ALL_USERS);
    const [search, setSearch] = useState("")
    const [addUser] = useMutation(ADD_USER);
    const {data: dataUser, loading: loadingUser, error} = useQuery(SEARCH_USERNAME, {
        variables: {
            username: session?.user?.name
        }
    })

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
      });

    const toggleDrawer = (open:any) => (event:any) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
    }

    setState({ ...state, ["right"]: open });
    };


    const users = data?.getUsers;
    const CheckUser = dataUser?.searchUsername;


    const sendUser = () => {
        if(CheckUser?.length === 0){
            console.log("ADICIONADO")
            addUser({
                variables: {
                    username: session?.user?.name
                }
            })
        }
    }

    const handleTyping = (e:any) => {
        setSearch(e?.target?.value);
    }
        
    useEffect(() => {
        if(!session) return;
        if(users && session){
            sendUser()   

        }
    }, [session])

    return (
            <div className="sticky top-0 z-50 flex bg-white px-4 py-2 shadow-sm items-center">
                <div className="relative h-10 w-20 flex-shrink-0 cursor-pointer">
                    <Link href="/">
                        <img className="mt-1 hidden lg:inline" src="https://upload.wikimedia.org/wikipedia/pt/thumb/5/58/Reddit_logo_new.svg/1200px-Reddit_logo_new.svg.png"/>
                    </Link>
                    <Link href="/">
                        <img className="h-8 w-8 flex mt-1 lg:hidden" src="https://play-lh.googleusercontent.com/7agI3dfDWNZ848WfXq6aQ6-6_1DiljaomtMiauNsr_2B8zorK8jesTqAmVycMCtwkWs" />
                    </Link>

                </div>



                <form className="flex w-56 items-center sm:space-x-2 border-gray-200 border rounded-sm bg-gray-100 sm:flex-1 px-3 py-1 lg:ml-10">
                    <SearchIcon className="h-6 w-6 text-gray-400"/>
                    <input type="text" placeholder="Search Reddit" onChange={(e) => handleTyping(e)} className="flex-1 bg-transparent outline-none" />
                    <Link href={`/search/${search}`}>
                        <button type="submit" hidden/>
                    </Link>
                </form>

                <div className="items-center space-x-2 text-gray-500 mx-5 hidden lg:inline-flex">
                    <SparklesIcon className="icon"/>
                    <Link href="/global"><GlobeIcon className="icon"/></Link>
                    <VideoCameraIcon  className="icon"/>
                    <hr className="h-10 border border-gray-100"/>
                    <ChatIcon className="icon"/>
                    <BellIcon className="icon"/>
                    <PlusIcon className="icon"/>
                    <SpeakerphoneIcon className="icon"/>
                </div>
                <div className="ml-5 flex items-center lg:hidden">
                    <MenuIcon className="icon" onClick={toggleDrawer(true)}/>
                </div>
                <Drawer
                    anchor={"right"}
                    open={state["right"]}
                    onClose={toggleDrawer(false)}
                >
                    <form onClick={toggleDrawer(false)}>
                        <SparklesIcon className="icon-sm"/>
                        <Link href="/global"><GlobeIcon className="icon-sm"/></Link>
                        <VideoCameraIcon className="icon-sm"/>
                        <hr className="h-3 border-gray-100"/>
                        <ChatIcon className="icon-sm"/>
                        <BellIcon className="icon-sm"/>
                        <PlusIcon className="icon-sm"/>
                        <SpeakerphoneIcon className="icon-sm"/>
                    </form>

                </Drawer>
                {
                    session?(
                        <div onClick={() => signOut()} className="hidden lg:flex items-center cursor-pointer space-x-2 border border-gray-100 p-2">
                            <div className="relative h-5 w-5 flex-shrink-0">
                                <Image objectFit="contain" layout="fill" src="https://links.papareact.com/23l"  alt="" />
                            </div>
                            <div className="flex-1 text-xs">
                                <p className="truncate">{session?.user?.name}</p>
                                <p className="text-gray-400">1 Karma</p>
                            </div>
                            <ChevronDownIcon className="h-5 flex-schrink-0 text-gray-400"/>
                        </div>
                    ) : (
                        <div onClick={() => signIn()} className="hidden lg:flex items-center cursor-pointer space-x-2 border border-gray-100 p-2">
                            <div className="relative h-5 w-5 flex-shrink-0">
                                <Image objectFit="contain" layout="fill" src="https://links.papareact.com/23l"  alt="" />
                            </div>
                            <p className="text-gray-400">Sign In</p>
                        </div>
                    )
                }

                
            </div>
    )
}

export default Header
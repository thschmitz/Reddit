import { useMutation, useQuery } from "@apollo/client"
import { BellIcon, ChatIcon, GlobeIcon, PlusIcon, SparklesIcon, SpeakerphoneIcon, StarIcon, VideoCameraIcon } from "@heroicons/react/outline"
import { MenuIcon, SearchIcon } from "@heroicons/react/solid"
import Drawer from '@mui/material/Drawer'
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useEffect, useState } from 'react'
import { ADD_USER } from '../graphql/mutations'
import { GET_ALL_USERS, SEARCH_USERNAME } from '../graphql/queries'
import { tokenService } from "../src/auth/tokenService"

const Header = (props:any) => {
    const session = props
    console.log("USUARIO: ", props)
    const {data, loading} = useQuery(GET_ALL_USERS);
    const [search, setSearch] = useState("")
    const [addUser] = useMutation(ADD_USER);
    const router = useRouter();
    const {data: dataUser, loading: loadingUser, error} = useQuery(SEARCH_USERNAME, {
        variables: {
            username: session?.nome
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
                    username: session?.nome
                }
            })
        }
    }

    const handleTyping = (e:any) => {
        setSearch(e?.target?.value);
    }

    function handleLogin() {
        router.push("/login");
    }

    function handleLogout() {
        tokenService.deleteAccessToken();
        tokenService.deleteRefreshToken();
        router.reload();
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
                <hr></hr>
                {
                    session?
                    <div onClick={() => handleLogout()} className="icon-sm">
                        <div className="relative h-5 w-5 flex-shrink-0">
                            <Image objectFit="contain" layout="fill" src="https://links.papareact.com/23l"  alt="" />
                        </div>
                        <div className="flex-1 text-xs">
                            <p className="flex justify-center">Logged</p>
                        </div>
                    </div>
                    :
                    <div onClick={() => handleLogin()} className="icon-sm">
                        <div className="relative h-5 w-5 flex-shrink-0">
                            <Image objectFit="contain" layout="fill" src="https://links.papareact.com/23l"  alt="" />
                        </div>
                        <div className="text-xs flex-1">
                            <p className="text-gray-400 flex justify-center">SignIn</p>
                        </div>
                        
                    </div>
                }
            </Drawer>
            {
                session?(
                    <div onClick={() => handleLogout()} className="hidden lg:flex items-center cursor-pointer space-x-2 border border-gray-100 p-2">
                        <div className="relative h-5 w-5 flex-shrink-0">
                            <Image objectFit="contain" layout="fill" src="https://links.papareact.com/23l"  alt="" />
                        </div>
                        <div className="flex-1 text-xs">
                            <p className="text-gray-400">Logout</p>
                        </div>
                    </div>
                ) : (
                    <div onClick={() => handleLogin()} className="hidden lg:flex items-center cursor-pointer space-x-2 border border-gray-100 p-2">
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
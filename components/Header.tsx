import React, { useEffect, useState } from 'react'
import Image from "next/image"
import {MenuIcon, ChevronDownIcon, HomeIcon, SearchIcon} from "@heroicons/react/solid"
import {StarIcon, BellIcon, ChatIcon, GlobeIcon, PlusIcon, SparklesIcon, SpeakerphoneIcon, VideoCameraIcon} from "@heroicons/react/outline"
import {signIn, signOut, useSession } from 'next-auth/react'
import Link from "next/link"
import {useQuery, useMutation} from "@apollo/client"
import { GET_ALL_USERS, SEARCH_USERNAME } from '../graphql/queries'
import { ADD_USER } from '../graphql/mutations'

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
                        <Image objectFit="contain" src="https://links.papareact.com/fqy" layout="fill"/>
                    </Link>
                </div>

                <div className="mx-7 flex items-center xl:min-w-[300px]">
                    <HomeIcon className="h-5 w-5"/>
                    <p className="flex-1 ml-2 hidden lg:inline">Home</p>
                    <ChevronDownIcon className="h-5 w-5"/>
                </div>

                <form className="flex flex-1 items-center space-x-2 border-gray-200 border rounded-sm bg-gray-100 px-3 py-1">
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
                    <MenuIcon className="icon"/>
                </div>
                
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